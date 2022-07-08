import { User, UserDocument } from './../schemas/users.schema';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Profile, ProfileDocument } from 'src/schemas/profiles.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Profile.name) private ProfileModel: Model<ProfileDocument>,
    private jwtService: JwtService) { }

  logout() {
    return { success: true, message: "Logout successfully" };
  }

  async signup(createAuthDto: CreateAuthDto) {
    if (!(createAuthDto.username.length > 0 && createAuthDto.password.length > 0)) {
      return { success: false, message: 'Tài khoản hoặc mật khẩu không hợp lệ' };
    }
    const user = await this.UserModel.findOne({ username: createAuthDto.username });
    if (user) {
      return { success: false, message: 'Tài khoản đã tồn tại' };
    }
    createAuthDto.password = await bcrypt.hash(createAuthDto.password, 10);
    const newUser = new this.UserModel(createAuthDto);
    await newUser.save();
    const newProfile = new this.ProfileModel({username: createAuthDto.username})
    await newProfile.save();
    return { success: true, message: 'Đăng ký thành công' };
  }

  async validateUser(username: string, password: string) {
    const user = await this.UserModel.findOne({ username: username });
    let isPasswordMatch = await bcrypt.compare(password, user.password);
    if (user && isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user._doc.username, id: user._doc._id, roles: user._doc.roles };
    return {
      username: user._doc.username,
      accessToken: this.jwtService.sign(payload),
      roles: user._doc.roles
    };
  }
}
