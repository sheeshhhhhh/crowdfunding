import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        @Inject('STRIPE_API_KEY') private readonly apiKey: string
    ) {
        this.stripe = new Stripe(this.apiKey, {
            apiVersion: '2024-12-18.acacia'
        })
    }

    async retrievePaymentSession(sessionId: string) {
        try {
            if(!sessionId) {
                throw new InternalServerErrorException('Session Id is required')
            }

            const getSession = await this.stripe.checkout.sessions.retrieve(sessionId)

            return getSession
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve payment session')
        }
    }

    async createPaymentSession(amount: number, currency: string, campaignId: string, BillingInformation: any) {
        try {
            // maybe try customer in stipe to put the billing information

            const stripeSession = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: currency,
                        unit_amount: amount * 100,
                        product_data: {
                            name: 'Donation',
                        },
                    },
                    quantity: 1
                }],
                currency: currency,
                customer_email: BillingInformation.email,
                mode: 'payment',
                success_url: process.env.CLIENT_BASE_URL + '/donation/check?sessionId={CHECKOUT_SESSION_ID}&type=stripe',
                cancel_url:  process.env.CLIENT_BASE_URL + '/campaigns/' + campaignId,
                metadata: {
                    campaignId: campaignId,
                    ...BillingInformation
                },
                billing_address_collection: 'auto',
            })

            return stripeSession
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to create payment intent')
        }
    }
}
