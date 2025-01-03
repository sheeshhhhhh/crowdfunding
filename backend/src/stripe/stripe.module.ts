import { DynamicModule, Inject, Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule],
      exports: [StripeService],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: async (ConfigService: ConfigService) => ConfigService.get('STRIPE_API_KEY'),
          inject: [ConfigService]
        }
      ]
    }
  }
}
