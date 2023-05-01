import { Injectable } from '@nestjs/common';
import { BotGateway } from './bot.gateway';
import { SettingsConfigService } from '@/constants/settings.service';
import { Guild, MessageEmbed, MessageOptions } from 'discord.js';
import { TextChannel } from 'discord.js';

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

  /** Bot excluded */
  async getAllGuildMembers() {
    const guild = await this.getGuild();
    const guildMember = await guild.members.fetch();
    return guildMember.filter((member) => !member.user.bot);
  }

  async send(message: MessageOptions, channelId: string) {
    const client = this.botGateway.getClient();
    const channel = (await client.channels.cache.get(channelId)) as TextChannel;
    await channel.send(message);
  }
}
