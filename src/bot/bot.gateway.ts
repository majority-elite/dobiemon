import { Injectable, Logger } from '@nestjs/common';
import { On, Once, InjectDiscordClient } from '@discord-nestjs/core';
import { Client, Message } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  async onMessage(message: Message): Promise<void> {
    if (!message.author.bot) {
      await message.reply('ㅁㄴㅇㄹ');
    }
  }
}
