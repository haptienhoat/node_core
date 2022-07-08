import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from 'src/schemas/profiles.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(@InjectModel(Profile.name) private ProfileModel: Model<ProfileDocument>) { }

  async findOne(user) {
    return await this.ProfileModel.findOne({username: user.username});
  }

  async update(updateProfileDto: UpdateProfileDto) {
    let profile = await this.ProfileModel.findOne({username: updateProfileDto.username})
    if (!profile) throw new NotFoundException('Profile not found');
    return await this.ProfileModel.updateOne({username: updateProfileDto.username}, updateProfileDto)
  }
}
