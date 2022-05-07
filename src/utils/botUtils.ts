import { MessageEmbed, Message } from 'discord.js';

interface GetBasicEmbedParams {
  title: string;
  description: string;
  footer?: string;
}

/**
 * 기본 정보를 이용해서 자주 쓰는 embed를 만들어 반환하는 함수
 * @returns `MessageEmbed`
 */
export function getBasicEmbed({
  title,
  description,
  footer = 'by 도비에몽',
}: GetBasicEmbedParams): MessageEmbed {
  const embed = new MessageEmbed({ title, description }).setFooter({
    text: footer,
  });
  return embed;
}

interface ReceiveReactionsParams {
  /** 반응을 보고 싶은 이모지 목록 */
  emojis: string[];
  /** 남은 시간을 알려주기 위해 갱신된 embed를 얻는 함수 */
  getEmbed: (remainingTime: number) => MessageEmbed;
  /** 리액션한 유저 수를 이용해 실행할 콜백 함수 */
  callback?: (count: number[]) => Promise<void>;
  /** 리액션을 확인할 메시지 */
  message: Message;
  /** 리액션을 달도록 기다리는 시간 (초) */
  waitingTime?: number;
}

/**
 * 특정 시간 동안 유저의 리액션을 요청하고,
 * 특정 이모지로 리액션한 유저 수를 이용해 콜백 함수를 실행하는 함수
 */
export async function receiveReactions({
  emojis,
  getEmbed,
  callback,
  message,
  waitingTime = 30,
}: ReceiveReactionsParams): Promise<void> {
  // 메시지에 이모지 달기
  await Promise.all(emojis.map((emoji) => message.react(emoji)));

  let remainingTime = waitingTime;

  /** 메시지에 리액션을 단 유저 수 확인 */
  async function checkReactions() {
    const reactions = message.reactions;
    const count = emojis.map(() => 0);

    await Promise.all(
      emojis.map(async (emoji, index) => {
        const users = await reactions.cache.get(emoji).users.fetch();
        users.forEach((user) => {
          if (!user.bot) {
            count[index] += 1;
          }
        });
      }),
    );

    // 리액션한 유저 수를 이용해 콜백 함수 실행
    await callback(count);
  }

  /** 매초 남은 시간 갱신 */
  function refresh() {
    remainingTime -= 1;
    message.edit({
      embeds: [getEmbed(remainingTime)],
    });

    setTimeout(remainingTime > 0 ? refresh : checkReactions, 1000);
  }

  refresh();
}
