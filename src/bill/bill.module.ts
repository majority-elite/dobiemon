import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { BotModule } from '@/bot/bot.module';
import { SettingsConfigModule } from '@/constants/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '@/entities/bill.entity';
import { Participants } from '@/entities/participants.entity';
import { Payment } from '@/entities/payment.entity';

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
