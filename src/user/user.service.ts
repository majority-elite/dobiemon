import { Injectable } from '@nestjs/common';
import type { UserProfile } from './user-info.inferface';
import { BotService } from '@/bot/bot.service';

@Injectable()
export class UserService {
  constructor(private readonly botService: BotService) {}

  async getAllUserProfiles(): Promise<UserProfile[]> {
    const allGuildMembers = await this.botService.getAllGuildMembers();
    const userProfiles: UserProfile[] = allGuildMembers.map((member) => ({
      userId: member.user.id,
      displayName: member.displayName,
      displayAvatarURL: member.displayAvatarURL(),
    }));
    return userProfiles;
  }
}
