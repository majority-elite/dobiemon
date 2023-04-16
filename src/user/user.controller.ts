import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInfo } from './user-info.inferface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/all')
  async getAllUserIDs(): Promise<UserInfo[]> {
    return await this.userService.getAllUsers();
  }
}
