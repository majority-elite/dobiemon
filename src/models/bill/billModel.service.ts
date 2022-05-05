import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/providers/prisma';
import { Prisma, bill as Bill } from '@prisma/client';

@Injectable()
export class BillModelService {
  constructor(private prisma: PrismaService) {}

  async bill(
    billWhereUniqueInput: Prisma.billWhereUniqueInput,
  ): Promise<Bill | null> {
    return this.prisma.bill.findUnique({
      where: billWhereUniqueInput,
    });
  }

  async bills(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.billWhereUniqueInput;
    where?: Prisma.billWhereInput;
    orderBy?: Prisma.billOrderByWithRelationInput;
  }): Promise<Bill[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.bill.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createBill(data: Prisma.billCreateInput): Promise<Bill> {
    return this.prisma.bill.create({ data });
  }

  async updateBill(params: {
    where: Prisma.billWhereUniqueInput;
    data: Prisma.billUpdateInput;
  }): Promise<Bill> {
    const { where, data } = params;
    return this.prisma.bill.update({ data, where });
  }

  async deleteBill(where: Prisma.billWhereUniqueInput): Promise<Bill> {
    return this.prisma.bill.delete({ where });
  }
}
