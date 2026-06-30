import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/user/dto/loginUserDto';
import { UserRegisterDto } from 'src/user/dto/registerUserDto';
import { UserPayload } from 'src/auth/interface/userPayload.interface';
import { UserService } from 'src/user/user.service';
import { comparePassword, hashPassword } from 'utils/password';
import { User } from './interface/user.interfcae';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(userRegisterDto: UserRegisterDto) {
    const hashedPassword = await hashPassword(userRegisterDto.password);
    const user = await this.userService.addNewUser({
      ...userRegisterDto,
      password: hashedPassword,
    });
    return user;
  }

  async validateuser(userLoginDto: UserLoginDto) {
    const user = await this.userService.findUserByEmail(userLoginDto.email);
    const isPasswordMatch = await comparePassword(
      userLoginDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }
    user.password = '';
    return user;
  }
  async loginUser(user: User) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      role: [user.role],
    };
    const access_token = await this.jwtService.signAsync(payload);
    return {
      access_token,
    };
  }
  async currentUser(userId: string) {
    const user = await this.userService.currentUser(userId);
    return user;
  }
  async logoutUser(userId: string) {
    const user = await this.userService.currentUser(userId);
    return user;
  }
}
