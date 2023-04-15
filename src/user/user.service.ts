import { SettingsConfigService } from '@/constants/settings.service';
import { Injectable } from '@nestjs/common';
import { GuildMember } from 'discord.js';
import { BotGateway } from 'src/bot/bot.gateway';

@Injectable()
export class UserService {
  constructor(
    private readonly bot: BotGateway,
    private readonly settingsConfigService: SettingsConfigService,
  ) {}

  async getAllUsers(): Promise<GuildMember[]> {
    const guild = await this.bot
      .getClient()
      .guilds.fetch(this.settingsConfigService.guildId);
    const usersCollection = await guild.members.fetch();

    return usersCollection.filter((member) => !member.user.bot).toJSON();
  }
}
