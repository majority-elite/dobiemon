import { Body, Controller, Post } from '@nestjs/common';
import { BillService } from './bill.service';
import { Bill } from './bill.model';

@Controller()
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('bill')
  async sendBill(@Body() billData: Bill): Promise<Bill> {
    const billEmbed = this.billService.createBillEmbed(billData);
    await this.billService.sendBillEmbed(billEmbed);
    return billData;
  }
}
