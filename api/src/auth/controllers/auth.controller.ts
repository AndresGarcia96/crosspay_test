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
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';

import { CreateUserDto } from '@/user/dto/create_user.dto';
import { LoginDto } from '../dto/login.dto';
import { EmailDto } from '../dto/email.dto';

import { RolesEnum } from '@/utils/enums/roles/roles.enum';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER //

  @Auth(RolesEnum.SUPER_ADMIN)
  @Post('register-super-admin')
  async registerSuperAdmin(@Body() dto: CreateUserDto) {
    return this.authService.registerUserWithRole(RolesEnum.SUPER_ADMIN, dto);
  }

  @Auth(RolesEnum.SUPER_ADMIN)
  @Post('register-admin')
  async registerAdmin(@Body() dto: CreateUserDto) {
    return this.authService.registerUserWithRole(RolesEnum.ADMIN, dto);
  }

  @Post('register-user')
  async registerUser(@Body() dto: CreateUserDto) {
    return this.authService.registerUserWithRole(RolesEnum.USER, dto);
  }

  @Post('register-auditor')
  async registerAuditor(@Body() dto: CreateUserDto) {
    return this.authService.registerUserWithRole(RolesEnum.AUDITOR, dto);
  }

  // LOGIN //

  @Post('refreshToken')
  async refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];

    return this.authService.refreshToken(token);
  }

  @Post('login-admin')
  async loginAdmin(@Body() dto: LoginDto) {
    return this.authService.loginUserWithRole(RolesEnum.ADMIN, dto);
  }

  @Post('login-user')
  async loginUser(@Body() dto: LoginDto) {
    return this.authService.loginUserWithRole(RolesEnum.USER, dto);
  }

  @Post('login-auditor')
  async loginAuditor(@Body() dto: LoginDto) {
    return this.authService.loginUserWithRole(RolesEnum.AUDITOR, dto);
  }

  @Post('verifyCodeAndLoginAdminOrAuditor/:email')
  async verifyCodeAndLoginAdminOrAuditor(
    @Param('email') email: string,
    @Body('verification_code') verification_code: number,
  ) {
    return await this.authService.verifyCodeAndLoginAdmin(
      email,
      verification_code,
    );
  }

  @Post('verifyCodeAndLoginUser/:email')
  async verifyCodeAndLoginUser(
    @Param('email') email: string,
    @Body('verification_code') verification_code: number,
  ) {
    return await this.authService.verifyCodeAndLoginAdmin(
      email,
      verification_code,
    );
  }

  @Post('resendVerificationUserCode')
  async resendVerificationUserCode(@Body() principal_email: EmailDto) {
    return await this.authService.resendVerificationUserCode(principal_email);
  }
}
