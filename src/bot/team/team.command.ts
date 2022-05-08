import {
  Command,
  DiscordCommand,
  CommandExecutionContext,
} from '@discord-nestjs/core';
import { CommandInteraction, Message, MessageEmbed, User } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { getBasicEmbed, receiveReactions } from '../utils';
import { fisherYatesShuffle } from '@/utils/algorithm';

const agreeEmoji = '👍';
const emojis = [agreeEmoji];

const WAITING_TIME = 10;

@Command({
  name: '팀',
  description:
    '내전을 하려 하나요? 도비에몽이 손쉽게 2개의 팀으로 나누어 줍니다.',
})
@Injectable()
export class TeamCommand implements DiscordCommand {
  async handler(
    interaction: CommandInteraction,
    executionContext: CommandExecutionContext,
  ): Promise<void> {
    const author = interaction.member;

    function getEmbed(time: number): MessageEmbed {
      return getBasicEmbed({
        title: '팀 배정이 시작됩니다.',
        description: `${author} 님이
        팀 배정을 시작했습니다.
        
        참여를 원하시면, ${time}초 이내에 이 메시지에 반응 ${agreeEmoji} 을 달아 주세요.`,
      });
    }

    const embed = getEmbed(WAITING_TIME);
    const message = await interaction.reply({
      embeds: [embed],
      fetchReply: true,
    });

    async function group(users: User[][], reply: Message): Promise<void> {
      const [agrees] = users;

      if (agrees.length <= 0) {
        await reply.edit({
          embeds: [
            getBasicEmbed({
              title: '팀을 배정하지 못했습니다.',
              description: '아무도 참여하지 않아서 팀을 나누지 않았습니다.',
            }),
          ],
        });

        return;
      }

      const shuffledAgrees = fisherYatesShuffle(agrees);

      const redTeamNum = Math.floor(shuffledAgrees.length / 2);
      const redTeam = shuffledAgrees.slice(0, redTeamNum);
      const blueTeam = shuffledAgrees.slice(redTeamNum);

      let [redTeamStr, blueTeamStr] = ['', ''];

      redTeam.forEach((user) => {
        redTeamStr += `${user} `;
      });

      blueTeam.forEach((user) => {
        blueTeamStr += `${user} `;
      });

      await reply.edit({
        embeds: [
          getBasicEmbed({
            title: '팀 배정이 완료되었습니다.',
            description: `[레드 팀]
          ${redTeamStr}
          
          [블루 팀]
          ${blueTeamStr}`,
          }),
        ],
      });
    }

    if (message instanceof Message) {
      receiveReactions({
        emojis,
        getEmbed,
        callback: async (users: User[][]) => {
          await group(users, message);
        },
        message,
        waitingTime: WAITING_TIME,
      });
    }
  }
}
