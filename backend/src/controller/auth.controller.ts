import { Controller, Post, Res, UseGuards, Request, Get, Req } from "@nestjs/common";
import { Response } from "express";
import { AuthService, UserDTO } from "../service/auth.service";
import { LocalAuthGuard } from "../service/local-auth.guard";
import { Public } from "../types/public.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: {user: UserDTO}, @Res({passthrough: true}) res: Response) {
    const { accessToken } = await this.authService.login(req.user);

    res.cookie('access-token', accessToken, {
      expires: new Date(Date.now() + 3600000 * 24), // 1 day
    });

    return { message: 'Login successful' };
  }

  @Get('profile')
  getProfile(@Req() req: {user: UserDTO}) {
    return {name: req.user.name};
  }
}