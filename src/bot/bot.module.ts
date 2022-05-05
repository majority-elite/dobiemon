import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { Intents } from 'discord.js';
import { SettingsConfigService } from '@/constants/settings.service';
import { SettingsConfigModule } from '@/constants/settings.module';
import { BotGateway } from './bot.gateway';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      imports: [SettingsConfigModule],
      useFactory: (settingsConfigService: SettingsConfigService) => ({
        token: settingsConfigService.botToken,
        discordClientOptions: {
          intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
        },
        registerCommandOptions: [
          {
            forGuild: settingsConfigService.guildId,
            removeCommandsBefore: true,
          },
        ],
      }),
      inject: [SettingsConfigService],
    }),
  ],
  providers: [BotGateway],
})
export class BotModule {}