import { Body, Controller, Post } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillInput } from './bill.input';

@Controller()
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post('bill')
  async sendBill(@Body() billData: BillInput): Promise<BillInput> {
    const billEmbed = this.billService.createBillEmbed(billData);
    await this.billService.sendBillEmbed(billEmbed);
    return billData;
  }
}
