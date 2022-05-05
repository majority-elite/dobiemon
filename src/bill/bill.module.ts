import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillModelModule } from '@/models/bill';

@Module({
  imports: [BillModelModule],
  controllers: [BillController],
})
export class BillModule {}
