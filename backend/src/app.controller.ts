import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LoginPayload, LoginResponse } from './auth/entities/login.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() loginPayload: LoginPayload): Promise<LoginResponse> {
    const user = await this.authService.validateUser(loginPayload);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    else return this.authService.login(user);
  }
}
