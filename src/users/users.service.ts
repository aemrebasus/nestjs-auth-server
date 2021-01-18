import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../core/base.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from './user.repository';

@Injectable()
export class UsersService extends BaseService<CreateUserDto, UpdateUserDto> {
  constructor(@Inject(USER_REPOSITORY) private userRepo: typeof User) {
    super(userRepo);
  }

  async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }
}
