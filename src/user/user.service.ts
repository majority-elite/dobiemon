import { SettingsConfigService } from '@/constants/settings.service';
import { Injectable } from '@nestjs/common';
import { BotGateway } from '@/bot/bot.gateway';
import { UserInfo } from './user-info.inferface';

@Injectable()
export class UserService {
  constructor(
    private readonly bot: BotGateway,
    private readonly settingsConfigService: SettingsConfigService,
  ) {}

  async getAllUsers(): Promise<UserInfo[]> {
    const guild = await this.bot
      .getClient()
      .guilds.fetch(this.settingsConfigService.guildId);
    const usersBotExcluded = (await guild.members.fetch()).filter(
      (member) => !member.user.bot,
    );

    const userInfos: UserInfo[] = usersBotExcluded.map((member) => ({
      displayName: member.displayName,
      userId: member.user.id,
      displayAvatarURL: member.user.displayAvatarURL(),
    }));

    return userInfos;
  }
}
