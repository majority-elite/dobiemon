import { Injectable } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { SettingsConfigService } from '@/constants/settings.service';
import { Guild } from 'discord.js';
import { MinimalUserInfo } from '@/user/user-info.inferface';

@Injectable()
export class BotService {
  constructor(
    private readonly botGateway: BotGateway,
    private readonly settingsConfigService: SettingsConfigService,
  ) {}

  async getGuild(): Promise<Guild> {
    return await this.botGateway
      .getClient()
      .guilds.fetch(this.settingsConfigService.guildId);
  }

  async getAllUsersInfoMinimal(): Promise<MinimalUserInfo[]> {
    const guild = await this.getGuild();
    const users = await guild.members.fetch();
    const userInfoBotExcluded = users.filter((member) => !member.user.bot);

    const userInfo: MinimalUserInfo[] = userInfoBotExcluded.map((member) => ({
      userId: member.user.id,
      displayName: member.displayName,
      displayAvatarURL: member.displayAvatarURL(),
    }));

    return userInfo;
  }
}
