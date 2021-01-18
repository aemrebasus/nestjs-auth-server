import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCookieAuth,
  ApiOAuth2,
  ApiBearerAuth,
  ApiAcceptedResponse,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dto';
import { FindOptions } from 'sequelize/types';
import { UsersService } from './users.service';
import { HasPermission } from './../auth/permission.decorator';
import { USER_PERMISSIONS } from './user.permissions';

@Controller('users')
// Permissions
@HasPermission([USER_PERMISSIONS.read])
// Security Doc
@ApiTags('Users Controller')
@ApiCookieAuth(process.env.JWT_TOKEN_KEY)
@ApiBearerAuth('Bearer')
// Response Doc
@ApiOkResponse()
@ApiAcceptedResponse()
@ApiNotFoundResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
@ApiNotAcceptableResponse()
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @HasPermission([USER_PERMISSIONS.create])
  @ApiOAuth2([USER_PERMISSIONS.create], 'permissions')
  @ApiCreatedResponse()
  create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @Get()
  findAll(@Query() findOptions: FindOptions) {
    return this.service.findAll(findOptions);
  }

  @Get(':id')
  findById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.findOneById(id);
  }

  @Put()
  @HasPermission([USER_PERMISSIONS.update])
  @ApiCreatedResponse({ description: 'Updated' })
  update(@Query() updateOptions, @Body() updateDTO: UpdateUserDto) {
    return this.service.update(updateDTO, updateOptions);
  }

  @Put(':id')
  @HasPermission([USER_PERMISSIONS.update])
  @ApiCreatedResponse({ description: 'Updated' })
  updateById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.service.updateById(updateUserDto, id);
  }

  @Delete(':id')
  @HasPermission([USER_PERMISSIONS.delete])
  removeById(@Param('id', new ParseIntPipe()) id: number) {
    return this.service.remove({ where: { id } });
  }
}
