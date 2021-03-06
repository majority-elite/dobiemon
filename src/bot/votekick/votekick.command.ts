import {
  Command,
  UsePipes,
  Payload,
  DiscordTransformedCommand,
  TransformedCommandExecutionContext,
} from '@discord-nestjs/core';
import { TransformPipe } from '@discord-nestjs/common';
import { Message, MessageEmbed, User, DiscordAPIError } from 'discord.js';
import { Injectable, Logger } from '@nestjs/common';
import { VotekickDto } from './votekick.dto';
import { getBasicEmbed, receiveReactions } from '../utils';
import { SettingsConfigService } from '@/constants/settings.service';

const agreeEmoji = 'π';
const disagreeEmoji = 'π';

const emojis = [agreeEmoji, disagreeEmoji];

const WAITING_TIME = 10;

@Command({
  name: 'μΆλ°©ν¬ν',
  description:
    'ν μ¬λμ΄ λ§μμ λ€μ§ μλλ€λ©΄ μΆλ°© ν¬νλ₯Ό μμν΄ λ³΄μΈμ. μ μ μ±λμ λ΄κΈ μ μμ΅λλ€.',
})
@Injectable()
@UsePipes(TransformPipe)
export class VotekickCommand implements DiscordTransformedCommand<VotekickDto> {
  private readonly logger = new Logger(VotekickCommand.name);

  constructor(private readonly settingsConfigService: SettingsConfigService) {}

  async handler(
    @Payload() dto: VotekickDto,
    executionContext: TransformedCommandExecutionContext,
  ): Promise<void> {
    const settingsConfigService = this.settingsConfigService;
    const logger = this.logger;

    const client = executionContext.interaction.client;
    const guild = await client.guilds.fetch(settingsConfigService.guildId);

    const author = executionContext.interaction.user;
    const target = dto.target;

    /** λ¨μ μκ°μ λ°λΌ κ°±μ λ λ©μμ§ λ°ν */
    function getEmbed(time: number): MessageEmbed {
      return getBasicEmbed({
        title: 'μΆλ°© ν¬νκ° μμλ©λλ€.',
        description: `${author} λμ΄
        <@${target}> λμ λν μΆλ°© ν¬νλ₯Ό μ΄μμ΅λλ€.
        
        μ°¬μ±νμλ©΄, ${time}μ΄ λ΄μ μ΄ λ©μμ§μ λ°μ ${agreeEmoji} μ λ¬μ μ£ΌμΈμ.
        λ°λνμλ©΄, ${disagreeEmoji} μ λ¬μ μ£ΌμΈμ.`,
      });
    }

    const voteEmbed = getEmbed(WAITING_TIME);
    const message = await executionContext.interaction.reply({
      embeds: [voteEmbed],
      fetchReply: true,
    });

    /**
     * ν¬νλ₯Ό λ°μ ν μ μ μ±λλ‘ λ³΄λΌμ§ κ²°μ νκ³  μ€μ λ‘ λ³΄λ΄λ ν¨μ
     * @param count μ΄λͺ¨μ§λ³λ‘ λ°μν μ μ  μ
     * @param reply κ²°μ λ μ λ³΄λ₯Ό λ΄λλ‘ μμ ν  λ©μμ§
     */
    async function kick(users: User[][], reply: Message): Promise<void> {
      const [agrees, disagrees] = users;

      if (agrees.length > disagrees.length) {
        // κ³Όλ°μ μ΄κ³Ό
        await reply.edit({
          embeds: [
            getBasicEmbed({
              title: 'μΆλ°©νλ κ²μΌλ‘ κ²°μ λμμ΅λλ€.',
              description: `<@${target}> λμ μΆλ°©μ΄ μ°¬μ± ${agrees.length}ν,
              λ°λ ${disagrees.length}νλ‘ κ°κ²°λμμ΅λλ€.`,
            }),
          ],
        });

        // μ μ μ±λλ‘ μ΄λ
        try {
          const targetMember = await guild.members.fetch(target);
          await targetMember.voice.setChannel(
            settingsConfigService.afkChannelId,
          );
        } catch (error) {
          if (error instanceof DiscordAPIError) {
            logger.log(error.message);
          } else throw error;
        }
      } else {
        // κ³Όλ°μ μ΄ν
        await reply.edit({
          embeds: [
            getBasicEmbed({
              title: 'μΆλ°©νμ§ μλ κ²μΌλ‘ κ²°μ λμμ΅λλ€.',
              description: `<@${target}> λμ μΆλ°©μ΄ μ°¬μ± ${agrees.length}ν,
              λ°λ ${disagrees.length}νλ‘ λΆκ²°λμμ΅λλ€.`,
            }),
          ],
        });
      }
    }

    if (message instanceof Message) {
      receiveReactions({
        emojis,
        getEmbed,
        message,
        waitingTime: WAITING_TIME,
        callback: async (users: User[][]): Promise<void> => {
          await kick(users, message);
        },
      });
    }
  }
}
