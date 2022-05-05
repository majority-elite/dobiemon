import {
  Command,
  UsePipes,
  Payload,
  DiscordTransformedCommand,
  ExecutionContext,
} from '@discord-nestjs/core';
import { TransformPipe } from '@discord-nestjs/common';
import { InteractionReplyOptions } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { SoragodungDto } from './soragodung.dto';
import { getBasicEmbed } from '@/utils/botUtils';

@Command({
  name: '소라고둥',
  description: '마법의 소라고둥이 여러 선택지 중 하나를 골라 드려요.',
})
@Injectable()
@UsePipes(TransformPipe)
export class SoragodungCommand
  implements DiscordTransformedCommand<SoragodungDto>
{
  handler(
    @Payload() dto: SoragodungDto,
    executionContext: ExecutionContext,
  ): InteractionReplyOptions {
    const choices = dto.choices.split(' ');
    const result = choices[Math.floor(Math.random() * choices.length)];

    const embed = getBasicEmbed({
      title: '그 중에서...',
      description: `${result} 선택해.`,
      footer: 'by 마법의 소라고둥 in 도비에몽',
    });

    return {
      embeds: [embed],
    };
  }
}
