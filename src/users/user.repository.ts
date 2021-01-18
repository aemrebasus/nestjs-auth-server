import { ValueProvider } from '@nestjs/common';
import { User } from './entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const UserRepository: ValueProvider = {
  provide: USER_REPOSITORY,
  useValue: User,
};
