import { LocalAuthGuard } from './guards/local-auth.guard';
import { Controller, Get, Post, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }

  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.signup(createAuthDto);
  }
}
