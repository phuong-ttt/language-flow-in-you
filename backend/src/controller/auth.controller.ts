import { Controller, Post, Res, UseGuards, Request } from "@nestjs/common";
import { Response } from "express";
import { AuthService, UserDTO } from "../service/auth.service";
import { LocalAuthGuard } from "../service/local-auth.guard";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: {user: UserDTO}, @Res({passthrough: true}) res: Response) {
    const { accessToken } = await this.authService.login(req.user);

    res.cookie('access-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 3600000 * 24), // 1 day
    });

    return { message: 'Login successful' };
  }
}