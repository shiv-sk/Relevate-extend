import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserRegisterDto } from 'src/user/dto/registerUserDto';
import { AuthService } from './auth.service';
import { UserLoginDto } from 'src/user/dto/loginUserDto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from './interface/user.interfcae';
import { RolesGuard } from './role.guard';
import { Roles } from './roles.decorators';
import { UserRole } from 'commons/userRoles.common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @Post('register')
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return await this.authService.registerUser(userRegisterDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.validateuser(userLoginDto);
    const { access_token } = await this.authService.loginUser(user);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });
    return { user, access_token: access_token };
  }
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Employer, UserRole.JobSeeker)
  @Get('me')
  me(@Req() req: Request & { user: User }) {
    return req.user;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out successfully' };
  }
}
