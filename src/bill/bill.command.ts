import {
  Command,
  UsePipes,
  TransformedCommandExecutionContext,
  DiscordCommand,
} from '@discord-nestjs/core';
import { TransformPipe } from '@discord-nestjs/common';
import { CommandInteraction } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { getBasicEmbed } from '@/bot/utils';

@Command({
  name: '정산',
  description: 'Bill to Friends로 간편하게 정산하기',
})
@Injectable()
@UsePipes(TransformPipe)
export class BillCommand implements DiscordCommand {
  constructor() {}

  async handler(
    interaction: CommandInteraction,
    executionContext: TransformedCommandExecutionContext,
  ): Promise<void> {
    const embed = getBasicEmbed({
      title: '간편하게 정산하고 싶다면?',
      description:
        'Try Bill to Friends: https://bill-to-friends.up.railway.app/',
    });
    await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });
  }
}
