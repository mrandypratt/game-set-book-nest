import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

@ApiTags('Users')
@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<string> {
    this.logger.log({ getAllUsersInput: {} });
    const users = this.userService.getAllUsers();

    this.logger.log({ getAllUsersOutput: { users } });
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<string> {
    this.logger.log({ getUserByIdInput: { id } });

    const user = this.userService.getUserById(id);

    this.logger.log({ getUserByIdOutput: { user } });
    return user;
  }
}
