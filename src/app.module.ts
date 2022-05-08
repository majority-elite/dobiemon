import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { BillModule } from './bill/bill.module';

// test

@Module({
  imports: [BotModule, BillModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
