import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { BillModule } from './bill/bill.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsConfigModule } from './constants/settings.module';
import { SettingsConfigService } from './constants/settings.service';
import { Bill } from './bill/bill.entity';

@Module({
  imports: [
    BotModule,
    BillModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [SettingsConfigModule],
      useFactory: (settingsConfigService: SettingsConfigService) => ({
        type: 'postgres',
        host: settingsConfigService.dbHost,
        port: settingsConfigService.dbPort,
        database: settingsConfigService.billDbName,
        username: settingsConfigService.billDbUsername,
        password: settingsConfigService.billDbPassword,
        entities: [Bill],
        synchronize: true,
      }),
      inject: [SettingsConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
