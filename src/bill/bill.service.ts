import { BotService } from '@/bot/bot.service';
import { Injectable } from '@nestjs/common';
import { MessageOptions, MessageEmbed } from 'discord.js';
import { SettingsConfigService } from '@/constants/settings.service';
import { Bill } from './bill.model';

@Injectable()
export class BillService {
  constructor(
    private readonly botService: BotService,
    private readonly settingsConfigService: SettingsConfigService,
  ) {}

  createBillEmbed(billData: Bill): MessageOptions {
    const bill = {
      content: billData.participants.map((id) => `<@${id}>`).join(', '),
      embeds: [
        new MessageEmbed()
          .setTitle('< Bill To Friends >')
          .addField(
            '* 누가 있었나요?',
            billData.participants.map((id) => `<@${id}>`).join(', '),
          ),
      ],
    };

    // purchased item
    let itemNames = '';
    let itemPrices = '';
    let itemPayers = '';
    billData.items.forEach((item) => {
      let newLines: number;
      if (item.payers.includes('all')) {
        newLines = 0;
        itemPayers = itemPayers.concat('모두\n');
      } else if (item.payers.length == 1) {
        newLines = 0;
        itemPayers = itemPayers
          .concat(item.payers.map((id) => `<@${id}>`).join('\n'))
          .concat('\n');
      } else {
        newLines = item.payers.length - 1;
        itemPayers = itemPayers
          .concat(item.payers.map((id) => `<@${id}>`).join('\n'))
          .concat('\n');
      }

      itemNames = itemNames.concat(
        item.name.concat('\n'),
        '\n'.repeat(newLines),
      );
      itemPrices = itemPrices.concat(
        item.price.toString().concat('\n'),
        '\n'.repeat(newLines),
      );
    });
    bill.embeds[0]
      .addField('* 무엇을 결제했나요?', ' ')
      .addField('이름', itemNames, true)
      .addField('가격', itemPrices, true)
      .addField('결제', itemPayers, true);

    // payment
    bill.embeds[0]
      .addField('* 이렇게 정산해요.', ' ')
      .addField(
        '멤버',
        billData.payments.map((payment) => `<@${payment.id}>`).join('\n'),
        true,
      )
      .addField(
        '금액',
        billData.payments
          .map((payment) => payment.amount.toString())
          .join('\n'),
        true,
      );

    return bill;
  }

  async sendBill(bill: MessageOptions) {
    await this.botService.send(bill, this.settingsConfigService.billChannelId);
  }
}
