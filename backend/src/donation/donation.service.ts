import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { enUS } from 'date-fns/locale';
import { CampaignService } from 'src/campaign/campaign.service';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { RequestUser } from 'src/guards/user.decorator';
import { InboxService } from 'src/inbox/inbox.service';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DonationDto } from './dto/donation.dto';
import { StripeService } from 'src/stripe/stripe.service';

@Injectable()
export class DonationService {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly campaignService: CampaignService,
    private readonly prisma: PrismaService,
    private readonly emailSender: EmailSenderService,
    private readonly inboxService: InboxService,
    private readonly stripeService: StripeService,
  ) {}

  // try to make 2 different for stripe and paymongo
  async createDonationGateway(
    userId: string,
    { amount, paymentMethod, campaignId, ...BillingInformation }: DonationDto,
  ) {
    const campaign = await this.campaignService.getCampaign(campaignId);

    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    
    // if card go to stripe
    if(paymentMethod === 'card') {
      try {
        const stripeSession = await this.stripeService.createPaymentSession(amount, 'PHP', campaignId, BillingInformation);

        return {
          success: true,
          type: 'stripe',
          stripeSession: stripeSession
        }
      } catch (error) {
        throw new InternalServerErrorException('Failed to create stripe session');
      }
    }

    const newPaymentIntent = await this.paymentService.createPaymentIntent(
      amount,
      userId,
      campaign,
      {...BillingInformation},
    );
    const newPaymentMethod = await this.paymentService.createPaymentMethod(paymentMethod);
    const attachPayment = await this.paymentService.attachPaymentIntent(
      newPaymentIntent.id,
      newPaymentMethod.id,
      newPaymentIntent.attributes?.client_key,
    );

    return {
      success: true,
      type: 'paymongo',
      redirectUrl: attachPayment.attributes.next_action.redirect.url,
    };
  }

  async createDonationdata(billingInformation: any, campaignId: string, amount: number, userId: string, paymentId: string) {
    const donationData = await this.prisma.donation.create({
      data: {
        amount: amount,
        paymentId: paymentId,
        message: '',
        postId: campaignId,
        userId: userId || '',
        // billing Information
        firstName: billingInformation.firstName,
        lastName: billingInformation.lastName,
        email: billingInformation.email,
        address: billingInformation.address,
        city: billingInformation.city,
        postalCode: billingInformation.postalCode,
        country: billingInformation.country,
      },
      include: {
        post: {
          select: {
            id: true,
            headerImage: true,
            userId: true
          },
        }
      }
    });

    return donationData;
  }

  async handleCheckPaymongoDonations(userId: string | undefined, paymentId: string) {
    const getPayment = await this.paymentService.retrievePaymentIntent(paymentId);

    if (getPayment.attributes.status !== 'succeeded') {
      return {
        success: false,
        message: 'Payment intent not yet succeeded',
      };
    }

    // check if donation exist already
    const checkDonation = await this.prisma.donation.findFirst({
      where: {
        paymentId: paymentId,
      },
    });

    if (checkDonation) {
      return {
        success: true,
        message: 'Donation already exist',
        donation: checkDonation,
      };
    }

    // if it is payed saved to database
    const donationData = await this.createDonationdata(
      getPayment.attributes.metadata, getPayment.attributes.metadata.campaignId, getPayment.attributes.amount / 100, userId, paymentId);
    
    // send email
    await this.emailSender.sendDonationEmail(getPayment.attributes.metadata.email, getPayment.attributes.metadata.firstName,
      getPayment.attributes.amount, donationData.post.headerImage)
    
    // send notif to campaign owner
    const createNotif = await this.inboxService.createNotification({
      userId: donationData.post.userId,
      title: 'New Donation',
      message: `You have received a new donation of $${getPayment.attributes.amount / 100} from ${getPayment.attributes.metadata.firstName} ${getPayment.attributes.metadata.lastName}`,
      type: 'PUSH',
    })

    // updating the number of donors
    const updateCampaign = await this.prisma.campaignPost.update({
      where: {
        id: getPayment.attributes.metadata.campaignId,
      },
      data: {
        current: {
          increment: getPayment.attributes.amount / 100,
        },
        totalDonors: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      donation: donationData,
    };
  }

  async handleCheckStripeDonations(userId: string | undefined, sessionId: string) {
    const getSession = await this.stripeService.retrievePaymentSession(sessionId);

    if(getSession.payment_status !== 'paid') {
      return {
        success: false,
        message: 'Payment intent not yet succeeded',
      };
    }

    // check if donation exist already
    const checkDonation = await this.prisma.donation.findFirst({
      where: {
        paymentId: sessionId,
      },
    });

    if (checkDonation) {
      return {
        success: true,
        message: 'Donation already exist',
        donation: checkDonation,
      };
    }

    // if it is payed saved to database
    const donationData = await this.createDonationdata(
      getSession.metadata, getSession.metadata.campaignId, getSession.amount_total / 100, userId, sessionId);
    
    // send email
    await this.emailSender.sendDonationEmail(getSession.metadata.email, getSession.metadata.firstName,
      getSession.amount_total, donationData.post.headerImage)
    
    // send notif to campaign owner
    const createNotif = await this.inboxService.createNotification({
      userId: donationData.post.userId,
      title: 'New Donation',
      message: `You have received a new donation of $${getSession.amount_total / 100} from ${getSession.metadata.firstName} ${getSession.metadata.lastName}`,
      type: 'PUSH',
    })

    // updating the number of donors
    const updateCampaign = await this.prisma.campaignPost.update({
      where: {
        id: getSession.metadata.campaignId,
      },
      data: {
        current: {
          increment: getSession.amount_total / 100,
        },
        totalDonors: {
          increment: 1,
        },
      },
    });

    return {
      success: true,
      donation: donationData,
    };
  }

  async checkDonations(userId: string | undefined, {paymentId,  type}) {
    if(type === 'paymongo') {
      const paymongoProcess = await this.handleCheckPaymongoDonations(userId, paymentId);
      
      return {
        success: true,
        donation: paymongoProcess.donation,
        redirectUrl: `${process.env.CLIENT_BASE_URL}/campaigns/${paymongoProcess.donation.postId}`, // put to campaign page
      }
    } else if(type === 'stripe') {
      const stripeProcess = await this.handleCheckStripeDonations(userId, paymentId);

      return {
        success: true,
        donation: stripeProcess.donation,
        redirectUrl: `${process.env.CLIENT_BASE_URL}/campaigns/${stripeProcess.donation.postId}`, // put to campaign page
      }
    } else {
      throw new BadRequestException('Invalid payment type');
    }
  }

  async checkMyDonations(user: RequestUser, search: string, page: number) {
    try {
      const take = 10;
      const skip = (page - 1) * take;
      const donations = await this.prisma.donation.findMany({
        where: {
          AND: [
            {
              post: {
                userId: user.id, // Ensures the post belongs to the user
              },
            },
            {
              OR: [
                {
                  post: {
                    title: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
                {
                  user: {
                    username: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              ],
            },
          ],
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              profile: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        skip,
        take,
      });

      const hasNext = (await this.prisma.donation.count({ where: { post: { userId: user.id } } })) > page * take;

      return {
        donations: donations,
        hasNext: hasNext,
      };
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getDonationStatistics(userId: string) {
    const totalDonations = await this.prisma.donation.aggregate({
      where: {
        userId: userId,
      },
      _sum: {
        amount: true,
      },
    });

    const averageDonation = await this.prisma.donation.aggregate({
      where: {
        userId: userId,
      },
      _avg: {
        amount: true,
      },
    });

    const totalDonors = await this.prisma.donation.count({
      where: {
        userId: userId,
      },
    });

    return {
      totalDonations: totalDonations._sum.amount,
      totalDonors: totalDonors,
      averageDonation: averageDonation._avg.amount,
    };
  }

  async getRecentDonations(user: RequestUser) {
    const donations = await this.prisma.donation.findMany({
      where: {
        post: {
          userId: user.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            profile: true,
            email: true,
          },
        },
      },
      take: 10,
    });

    return donations;
  }

  async getMonthlyDonations(user: RequestUser) {
    const donations = await this.prisma.donation.findMany({
      where: {
        userId: user.id,
      },
    });

    const monthlyDonations = donations.reduce((acc, donation) => {
      const month = donation.createdAt.getMonth();
      acc[month] = (acc[month] || 0) + donation.amount;
      return acc;
    }, {});

    let monthlyDonationsArray = [];
    for (let key in monthlyDonations) {
      monthlyDonationsArray.push({
        month: enUS.localize.month(key, { width: 'abbreviated' }),
        amount: monthlyDonations[key] || 0,
      });
    }

    return monthlyDonationsArray;
  }

  async getOverview(user: RequestUser) {
    const userId = user.id;
    const { totalDonations, averageDonation, totalDonors } =
      await this.getDonationStatistics(user.id);
    const recentDonations = await this.getRecentDonations(user);
    const monthlyDonationsStats = await this.getMonthlyDonations(user);

    const activeCampaignscount = await this.prisma.campaignPost.count({
      where: {
        userId: userId,
        status: 'ACTIVE',
      },
    });

    return {
      activeCampaignscount,
      totalDonations,
      averageDonation,
      totalDonors,
      recentDonations,
      monthlyDonationsStats,
    };
  }

  async getDonation(donationId: string) {
    const donation = await this.prisma.donation.findUnique({
      where: {
        id: donationId,
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            headerImage: true,
          },
        },
      },
    });

    if(!donation) {
      throw new NotFoundException('Donation not found');
    }

    return donation;
  }

  async editUpdateMessage(message: string, donationId: string) {
    const updateMessage = await this.prisma.donation.update({
      where: {
        id: donationId,
      },
      data: {
        message: message,
      },
    });

    return updateMessage;
  }
}
