import { ConsoleLogger, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CampaignService } from 'src/campaign/campaign.service';
import { RequestUser } from 'src/guards/user.decorator';
import { PaymentService } from 'src/payment/payment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DonationDto } from './dto/donation.dto';
import { enUS } from 'date-fns/locale';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { InboxService } from 'src/inbox/inbox.service';

@Injectable()
export class DonationService {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly campaignService: CampaignService,
    private readonly prisma: PrismaService,
    private readonly emailSender: EmailSenderService,
    private readonly inboxService: InboxService,
  ) {}

  // also include billing information
  async createDonationGateway(
    userId: string,
    { amount, paymentMethod, campaignId, ...BillingInformation }: DonationDto,
  ) {
    const campaign = await this.campaignService.getCampaign(campaignId);

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
      redirectUrl: attachPayment.attributes.next_action.redirect.url,
    };
  }

  async checkDonations(userId: string | undefined, paymentId: string) {
    const getPayment = await this.paymentService.retrievePaymentIntent(paymentId);

    if (getPayment.attributes.status !== 'succeeded') {
      return {
        success: false,
        message: 'Payment intent not yet succeeded',
      };
    }

    const redirectUrl = `${process.env.CLIENT_BASE_URL}/campaigns/${getPayment.attributes.metadata.campaignId}`; // put to campaign page

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

    // if it is payed
    const donationData = await this.prisma.donation.create({
      data: {
        amount: getPayment.attributes.amount / 100,
        paymentId: paymentId,
        message: '', 
        postId: getPayment.attributes.metadata.campaignId,
        userId: userId || undefined,
        // billing Information
        firstName: getPayment.attributes.metadata.firstName,
        lastName: getPayment.attributes.metadata.lastName,
        email: getPayment.attributes.metadata.email,
        address: getPayment.attributes.metadata.address,
        city: getPayment.attributes.metadata.city,
        postalCode: getPayment.attributes.metadata.postalCode,
        country: getPayment.attributes.metadata.country,
      },
      include: {
        post: true // for email image
      }
    });

    
    // send email
    await this.emailSender.sendEmail(
      getPayment.attributes.metadata.email,
      'Donation ',
      `Thankyou for Donation! ${getPayment.attributes.metadata.firstName}`,
       `
        Thank you for your $${getPayment.attributes.amount / 100} donation! 
        Your support is making a real difference and helps us continue our mission. 
        We truly appreciate your contribution and commitment to creating positive change.
      `,
      donationData.post.headerImage
    )
    
    // send notif to campaign owner
    const createNotif = await this.inboxService.createNotification({
      userId: donationData.post.userId,
      title: 'New Donation',
      message: `You have received a new donation of $${getPayment.attributes.amount / 100} from ${getPayment.attributes.metadata.firstName} ${getPayment.attributes.metadata.lastName}`,
      type: 'PUSH',
    })

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
      redirect_url: redirectUrl,
    };
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

  async getDonationStatistics(user: RequestUser) {
    const totalDonations = await this.prisma.donation.aggregate({
      where: {
        userId: user.id,
      },
      _sum: {
        amount: true,
      },
    });

    const averageDonation = await this.prisma.donation.aggregate({
      where: {
        userId: user.id,
      },
      _avg: {
        amount: true,
      },
    });

    const totalDonors = await this.prisma.donation.count({
      where: {
        userId: user.id,
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
      await this.getDonationStatistics(user);
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
