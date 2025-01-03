import {
  BadRequestException,
  GoneException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CampaignPost } from '@prisma/client';
import axios from 'axios';
import { BillingInformation } from 'src/donation/dto/donation.dto';

@Injectable()
export class PaymentService {
  getHeaders(keyType: 'public' | 'secret') {
    const paymongoKey =
      keyType === 'public'
        ? process.env.PAYMONGO_TEST_PUBLIC
        : process.env.PAYMONGO_TEST_SECRET;

    return {
      headers: {
        Authorization: `Basic ${Buffer.from(paymongoKey).toString('base64')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }

  async createPaymentIntent(
    amount: number,
    userId: string,
    campaign: CampaignPost,
    BillingInformation: BillingInformation,
  ) {
    try {
      if (amount < 20) {
        throw new BadRequestException('Amount must be at least 20');
      }

      const response = await axios.post(
        `${process.env.PAYMONGO_API_URL}/payment_intents`,
        JSON.stringify({
          data: {
            attributes: {
              amount: parseInt(amount.toString() + '00'),
              payment_method_allowed: ['card', 'paymaya', 'gcash', 'grab_pay'],
              payment_method_options: {
                card: {
                  request_three_d_secure: 'any',
                },
              },
              currency: 'PHP',
              capture_type: 'automatic',
              metadata: {
                userId: userId || 'anonymous',
                campaignId: campaign.id,
                campaignTitle: campaign.title,
                ...BillingInformation,
              },
            },
          },
        }),
        { ...this.getHeaders('secret'), validateStatus: () => true },
      );

      return response.data.data;
    } catch (error) {
      throw new InternalServerErrorException('Error creating payment intent');
    }
  }

  async retrievePaymentIntent(paymentIntentId: string) {
    try {
      if (!paymentIntentId) {
        throw new GoneException('missing payment intent id');
      }

      const getPaymentIntent = await axios.get(
        `${process.env.PAYMONGO_API_URL}/payment_intents/${paymentIntentId}`,
        { ...this.getHeaders('secret'), validateStatus: () => true },
      );

      return getPaymentIntent.data.data;
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving payment intent');
    }
  }

  async attachPaymentIntent(
    paymentIntentId: string,
    paymentMethodId: string,
    clientKey: string,
  ) {
    try {
      const returnUrl = `${process.env.CLIENT_BASE_URL}/donation/check?client_key=${clientKey}&type=paymongo`;

      const response = await axios.post(
        `${process.env.PAYMONGO_API_URL}/payment_intents/${paymentIntentId}/attach`,
        JSON.stringify({
          data: {
            attributes: {
              payment_method: paymentMethodId,
              client_key: clientKey, // this is get in the payment Intent if the key used is public
              return_url: returnUrl,
            },
          },
        }),
        { ...this.getHeaders('public'), validateStatus: () => true },
      );
      return response.data.data;
    } catch (error) {
      throw new InternalServerErrorException('Error attaching payment intent');
    }
  }

  // maybe add types to paymentMethod??
  async createPaymentMethod(paymentMethod: string) {
    try {
      const response = await axios.post(
        `${process.env.PAYMONGO_API_URL}/payment_methods`,
        JSON.stringify({
          data: {
            attributes: {
              type: paymentMethod,
              // details:  for cards
            },
          },
        }),
        { ...this.getHeaders('public'), validateStatus: () => true },
      );

      return response.data.data;
    } catch (error) {
      throw new InternalServerErrorException('Error creating payment method');
    }
  }
}
