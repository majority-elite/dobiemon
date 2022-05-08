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

const agreeEmoji = '👍';
const disagreeEmoji = '👎';

const emojis = [agreeEmoji, disagreeEmoji];

const WAITING_TIME = 10;

@Command({
  name: '추방투표',
  description:
    '한 사람이 마음에 들지 않는다면 추방 투표를 시작해 보세요. 잠수 채널에 담글 수 있습니다.',
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

    /** 남은 시간에 따라 갱신된 메시지 반환 */
    function getEmbed(time: number): MessageEmbed {
      return getBasicEmbed({
        title: '추방 투표가 시작됩니다.',
        description: `${author} 님이
        <@${target}> 님에 대한 추방 투표를 열었습니다.
        
        찬성하시면, ${time}초 내에 이 메시지에 반응 ${agreeEmoji} 을 달아 주세요.
        반대하시면, ${disagreeEmoji} 을 달아 주세요.`,
      });
    }

    const voteEmbed = getEmbed(WAITING_TIME);
    const message = await executionContext.interaction.reply({
      embeds: [voteEmbed],
      fetchReply: true,
    });

    /**
     * 투표를 받은 후 잠수 채널로 보낼지 결정하고 실제로 보내는 함수
     * @param count 이모지별로 반응한 유저 수
     * @param reply 결정된 정보를 담도록 수정할 메시지
     */
    async function kick(users: User[][], reply: Message): Promise<void> {
      const [agrees, disagrees] = users;

      if (agrees.length > disagrees.length) {
        // 과반수 초과
        await reply.edit({
          embeds: [
            getBasicEmbed({
              title: '추방하는 것으로 결정되었습니다.',
              description: `<@${target}> 님의 추방이 찬성 ${agrees.length}표,
              반대 ${disagrees.length}표로 가결되었습니다.`,
            }),
          ],
        });

        // 잠수 채널로 이동
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
        // 과반수 이하
        await reply.edit({
          embeds: [
            getBasicEmbed({
              title: '추방하지 않는 것으로 결정되었습니다.',
              description: `<@${target}> 님의 추방이 찬성 ${agrees.length}표,
              반대 ${disagrees.length}표로 부결되었습니다.`,
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
