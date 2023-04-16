import { Injectable } from '@nestjs/common';
import { MinimalUserInfo } from './user-info.inferface';
import { BotService } from '@/bot/bot.service';

@Injectable()
export class UserService {
  constructor(private readonly botService: BotService) {}

  async getAllUsersInfoMinimal(): Promise<MinimalUserInfo[]> {
    return await this.botService.getAllUsersInfoMinimal();
  }
}
