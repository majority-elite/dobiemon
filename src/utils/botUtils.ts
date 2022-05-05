import { MessageEmbed } from 'discord.js';

interface GetBasicEmbedParams {
  title: string;
  description: string;
  footer?: string;
}

export function getBasicEmbed({
  title,
  description,
  footer = 'by 도비에몽',
}: GetBasicEmbedParams) {
  const embed = new MessageEmbed({ title, description }).setFooter({
    text: footer ?? 'by 도비에몽',
  });
  return embed;
}
