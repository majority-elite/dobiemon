import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { BotModule } from '@/bot/bot.module';
import { SettingsConfigModule } from '@/constants/settings.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsConfigService } from '@/constants/settings.service';

@Module({
  imports: [
    BotModule,
    SettingsConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [SettingsConfigModule],
      useFactory: (settingsConfigService: SettingsConfigService) => ({
        type: 'postgres',
        host: settingsConfigService.dbHost,
        port: settingsConfigService.dbPort,
        database: settingsConfigService.billDbName,
        username: settingsConfigService.billDbUsername,
        password: settingsConfigService.billDbPassword,
        entities: [],
        synchronize: true,
      }),
      inject: [SettingsConfigService],
    }),
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule {}
