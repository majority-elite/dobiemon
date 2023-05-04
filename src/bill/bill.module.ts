import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { BotModule } from '@/bot/bot.module';
import { SettingsConfigModule } from '@/constants/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bill.entity';

@Module({
  imports: [BotModule, SettingsConfigModule, TypeOrmModule.forFeature([Bill])],
  controllers: [BillController],
  providers: [BillService],
  exports: [TypeOrmModule],
})
export class BillModule {}
