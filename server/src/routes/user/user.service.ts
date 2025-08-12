import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async getAllUsers(): Promise<string> {
    this.logger.log({ getAllUsersInput: {} });

    const users = 'This would return all users';

    this.logger.log({ getAllUsersOutput: { users } });
    return users;
  }

  async getUserById(id: string): Promise<string> {
    this.logger.log({ getUserByIdInput: { id } });

    const user = `This would return the user with id: ${id}`;

    this.logger.log({ getUserByIdOutput: { user } });
    return user;
  }
}
