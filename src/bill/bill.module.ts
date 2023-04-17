import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { BotModule } from '@/bot/bot.module';
import { SettingsConfigModule } from '@/constants/settings.module';

@Module({
  imports: [BotModule, SettingsConfigModule],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
