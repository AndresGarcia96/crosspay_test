import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Auth } from '@/auth/decorators/auth.decorator';

import { CreateUserDto } from '../dto/create_user.dto';

import { RolesEnum } from '@/utils/enums/roles/roles.enum';
import { UpdateUserDto } from '../dto/update_user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Auth(RolesEnum.SUPER_ADMIN)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // GET METHODS //

  @Auth(RolesEnum.ADMIN)
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Auth(RolesEnum.ADMIN)
  @Get('all-active-users')
  async getAllActiveUsers() {
    return this.usersService.getAllActiveUsers();
  }

  @Auth(RolesEnum.ADMIN)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Auth(RolesEnum.ADMIN)
  @Get('id-number/:idNumber')
  async getUserByIdNumber(@Param('idNumber') idNumber: string) {
    return this.usersService.getUserByIdNumber(idNumber);
  }

  @Auth(RolesEnum.ADMIN)
  @Get('roles/:idNumber')
  async getUserRoles(@Param('idNumber') idNumber: string) {
    return this.usersService.getUserRoles(idNumber);
  }

  @Get('/getSuperAdminUserByIdNumber/:idNumber')
  async getSuperAdminUserByIdNumber(@Param('idNumber') idNumber: string) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.SUPER_ADMIN,
    ]);
  }

  @Get('/getSuperAdminUserByIdNumber/:idNumber')
  async getAdminsUserByIdNumber(@Param('idNumber') idNumber: string) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.SUPER_ADMIN,
    ]);
  }

  @Get('/getAdminUserByIdNumber/:idNumber')
  async getAdminUserByIdNumber(@Param('idNumber') idNumber: string) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.ADMIN,
    ]);
  }

  @Get('/getCollaboratorUserByIdNumber/:idNumber')
  async getCollaboratorUserByIdNumber(@Param('idNumber') idNumber: string) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.USER,
    ]);
  }

  @Get('/getAuditorUserByIdNumber/:idNumber')
  async getAuditorUserByIdNumber(@Param('idNumber') idNumber: string) {
    return await this.usersService.getUserByIdNumberAndRole(idNumber, [
      RolesEnum.AUDITOR,
    ]);
  }

  // PATCH METHODS //

  @Auth(RolesEnum.ADMIN)
  @Patch('update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Auth(RolesEnum.ADMIN)
  @Patch('ban-user/:id')
  async banUser(@Param('id') id: string) {
    return this.usersService.banUser(id);
  }
}
