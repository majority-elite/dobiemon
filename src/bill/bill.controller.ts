import { Controller, Get } from '@nestjs/common';
import { BillModelService } from '@/models/bill';
import { bill as BillModel } from '@prisma/client';

@Controller()
export class BillController {
  constructor(private readonly billModelService: BillModelService) {}

  @Get('bill/test')
  async testBill(): Promise<BillModel> {
    return this.billModelService.bill({ id: '6273c6899b97cf7bc407bdd5' });
  }
}
