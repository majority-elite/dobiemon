import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BotModule } from '@/bot/bot.module';
import { SettingsConfigService } from '@/constants/settings.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [BotModule, ConfigModule],
  providers: [UserService, SettingsConfigService, ConfigService],
  controllers: [UserController],
})
export class UserModule {}
