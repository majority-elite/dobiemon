import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV } from './settings';

@Injectable()
export class SettingsConfigService {
  constructor(private configService: ConfigService) {}

  get botToken(): string {
    return process.env.NODE_ENV === 'development'
      ? this.configService.get(ENV.BOT_TEST_TOKEN)
      : this.configService.get(ENV.BOT_TOKEN);
  }

  get guildId(): string {
    return this.configService.get(ENV.GUILD_ID);
  }
}
