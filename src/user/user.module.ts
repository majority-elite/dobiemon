import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { BotModule } from '@/bot/bot.module';
import { SettingsConfigModule } from '@/constants/settings.module';

@Module({
  imports: [BotModule, SettingsConfigModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
