import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jtw.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() request) {
    return request.user;
  }

  @Get('profile-api-key')
  @UseGuards(AuthGuard('bearer'))
  getProfileApiKey(@Req() req) {
    delete req.user.password;
    return {
      msg: 'Authenticated with api key',
      user: req.user,
    };
  }
}
