import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV } from './settings';

@Injectable()
export class SettingsConfigService {
  constructor(private configService: ConfigService) {}

  get botToken(): string {
    return process.env.NODE_ENV === 'development' &&
      process.env[ENV.RAILWAY_ENVIRONMENT] !== 'production'
      ? this.configService.get(ENV.BOT_TEST_TOKEN)
      : this.configService.get(ENV.BOT_TOKEN);
  }

  get guildId(): string {
    return this.configService.get(ENV.GUILD_ID);
  }

  get afkChannelId(): string {
    return this.configService.get(ENV.AFK_CHANNEL_ID);
  }
}
