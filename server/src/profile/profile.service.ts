import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from 'src/schemas/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}
  async create(createProfileDto: CreateProfileDto, userId: string) {
    const existingProfile = await this.profileModel.findOne({ userId });
    if (existingProfile) {
      throw new InternalServerErrorException(
        'Profile already exists for this user',
      );
    }
    const newProfile = await this.profileModel.create({
      name: createProfileDto.name,
      email: createProfileDto.email,
      bio: createProfileDto.bio,
      currentLocation: createProfileDto.currentLocation,
      lookingFor: createProfileDto.lookingFor,
      skills: createProfileDto.skills,
      education: createProfileDto.education,
      projects: createProfileDto.projects,
      socialMedia: createProfileDto.socialMedia,
      experience: createProfileDto.experience,
      userId,
    });
    if (!newProfile) {
      throw new InternalServerErrorException('Profile is not created!');
    }
    console.log(newProfile);
    return newProfile;
  }

  async findOne(profileId: string) {
    const profile = await this.profileModel.findById(profileId);
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async findUserProfile(userId: string) {
    const profile = await this.profileModel.findOne({ userId });
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
    return profile;
  }

  async update(updateProfileDto: UpdateProfileDto, userId: string) {
    const updatedProfile = await this.profileModel.findOneAndUpdate(
      { userId },
      updateProfileDto,
      { new: true, runValidators: true },
    );
    if (!updatedProfile) {
      throw new NotFoundException('Profile not found and updated');
    }
    return updatedProfile;
  }

  async remove(userId: string) {
    const deletedProfile = await this.profileModel.findOneAndDelete({ userId });
    if (!deletedProfile) {
      throw new NotFoundException('Profile not found and deleted');
    }
    return 'profile deleted successfully';
  }
}
