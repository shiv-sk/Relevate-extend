import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserRegisterDto } from './dto/registerUserDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async addNewUser(userRegisterDto: UserRegisterDto) {
    const existedUser = await this.userModel.findOne({
      email: userRegisterDto.email,
    });
    if (existedUser) {
      throw new BadRequestException('Email already exists');
    }
    const newUser = await this.userModel.create({
      ...userRegisterDto,
    });
    if (!newUser) {
      throw new InternalServerErrorException('User is not registered');
    }
    const user = {
      name: newUser.name,
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };
    return user;
  }

  async findUserByEmail(email: string) {
    const foundUser = await this.userModel.findOne({ email });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    const user = {
      name: foundUser.name,
      email: foundUser.email,
      password: foundUser.password,
      role: foundUser.role,
      id: foundUser._id.toString(),
    };
    return user;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
  async currentUser(userId: string) {
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
