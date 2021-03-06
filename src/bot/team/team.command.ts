import {
  Command,
  DiscordCommand,
  CommandExecutionContext,
} from '@discord-nestjs/core';
import { CommandInteraction, Message, MessageEmbed, User } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { getBasicEmbed, receiveReactions } from '../utils';
import { fisherYatesShuffle } from '@/utils/algorithm';

const agreeEmoji = 'π';
const emojis = [agreeEmoji];

const WAITING_TIME = 10;

@Command({
  name: 'ν',
  description:
    'λ΄μ μ νλ € νλμ? λλΉμλͺ½μ΄ μμ½κ² 2κ°μ νμΌλ‘ λλμ΄ μ€λλ€.',
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
        title: 'ν λ°°μ μ΄ μμλ©λλ€.',
        description: `${author} λμ΄
        ν λ°°μ μ μμνμ΅λλ€.
        
        μ°Έμ¬λ₯Ό μνμλ©΄, ${time}μ΄ μ΄λ΄μ μ΄ λ©μμ§μ λ°μ ${agreeEmoji} μ λ¬μ μ£ΌμΈμ.`,
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
              title: 'νμ λ°°μ νμ§ λͺ»νμ΅λλ€.',
              description: 'μλ¬΄λ μ°Έμ¬νμ§ μμμ νμ λλμ§ μμμ΅λλ€.',
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
            title: 'ν λ°°μ μ΄ μλ£λμμ΅λλ€.',
            description: `[λ λ ν]
          ${redTeamStr}
          
          [λΈλ£¨ ν]
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
