import { Injectable } from '@nestjs/common';
import { UsersService } from './users';

@Injectable()
export class AppService {
  constructor(private userService: UsersService) {}
  getHello(): any {
    return this.userService.findAll();
  }
}
