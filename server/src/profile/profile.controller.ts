import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorators';
import { UserRole } from 'commons/userRoles.common';
import { Request } from 'express';
import { User } from 'src/auth/interface/user.interfcae';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JobSeeker)
  create(
    @Body() createProfileDto: CreateProfileDto,
    @Req() req: Request & { user: User },
  ) {
    return this.profileService.create(createProfileDto, req.user.id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JobSeeker)
  findUserProfile(@Req() req: Request & { user: User }) {
    return this.profileService.findUserProfile(req.user.id);
  }

  @Get(':profileId')
  findOne(@Param('profileId') profileId: string) {
    return this.profileService.findOne(profileId);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JobSeeker)
  update(
    @Body() updateProfileDto: UpdateProfileDto,
    @Req() req: Request & { user: User },
  ) {
    return this.profileService.update(updateProfileDto, req.user.id);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.JobSeeker)
  remove(@Req() req: Request & { user: User }) {
    return this.profileService.remove(req.user.id);
  }
}
