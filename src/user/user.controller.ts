import { GuildMember } from 'discord.js';
import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/all')
  async getAllUserIDs(): Promise<GuildMember[]> {
    return await this.userService.getAllUsers();
  }
}
