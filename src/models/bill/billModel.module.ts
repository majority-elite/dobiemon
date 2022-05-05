import { Module } from '@nestjs/common';
import { PrismaService } from '@/providers/prisma';
import { BillModelService } from './billModel.service';

@Module({
  providers: [BillModelService, PrismaService],
  exports: [BillModelService],
})
export class BillModelModule {}
