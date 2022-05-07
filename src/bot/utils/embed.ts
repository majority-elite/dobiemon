import { MessageEmbed } from 'discord.js';

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
