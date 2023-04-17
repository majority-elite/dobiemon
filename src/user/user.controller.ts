import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfile } from './user.inferface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user/all/profile')
  async getAllUserProfiles(): Promise<UserProfile[]> {
    return await this.userService.getAllUserProfiles();
  }
}
