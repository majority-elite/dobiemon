import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV } from './settings';

@Injectable()
export class SettingsConfigService {
  constructor(private configService: ConfigService) {}

  get botToken(): string {
    const TEST_TOKEN = this.configService.get(ENV.BOT_TEST_TOKEN);
    const TOKEN = this.configService.get(ENV.BOT_TOKEN);

    const RAILWAY_ENV = process.env[ENV.RAILWAY_ENVIRONMENT];
    if (RAILWAY_ENV) {
      if (RAILWAY_ENV === 'production') return TOKEN;
      else return TEST_TOKEN;
    }

    return process.env.NODE_ENV === 'development' ? TEST_TOKEN : TOKEN;
  }

  get guildId(): string {
    return this.configService.get(ENV.GUILD_ID);
  }

  get afkChannelId(): string {
    return this.configService.get(ENV.AFK_CHANNEL_ID);
  }
}
