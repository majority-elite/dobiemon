import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SettingsConfigService } from './settings.service';
import * as Joi from 'joi';
import { ENV } from '@/constants/settings';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object<typeof ENV, true>({
        [ENV.NODE_ENV]: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        [ENV.BOT_TOKEN]: Joi.string().required(),
        [ENV.BOT_TEST_TOKEN]: Joi.string().required(),
        [ENV.GUILD_ID]: Joi.string().required(),
        [ENV.DATABASE_URL]: Joi.string().required(),
      }),
    }),
  ],
  providers: [SettingsConfigService],
  exports: [SettingsConfigService],
})
export class SettingsConfigModule {}
