import { Controller, Get } from '@nestjs/common';

@Controller()
export class BillController {
  constructor() {}

  @Get('bill/test')
  async testBill(): Promise<string> {
    return "test";
  }
}
