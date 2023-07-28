import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { BotModule } from '@/bot/bot.module';
import { SettingsConfigModule } from '@/constants/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '@/bill/entities/bill.entity';
import { Participants } from '@/bill/entities/participants.entity';
import { Payment } from '@/bill/entities/payment.entity';

@Module({
  imports: [
    BotModule,
    SettingsConfigModule,
    TypeOrmModule.forFeature([Bill, Participants, Payment]),
  ],
  controllers: [BillController],
  providers: [BillService],
  exports: [TypeOrmModule],
})
export class BillModule {}
