import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "../controller/auth.controller";
import { AuthService } from "../service/auth.service";
import { JwtStrategy } from '../service/jwt.strategy';
import { UserModule } from "./user.module";
import { LocalStrategy } from "../service/local.strategy";
import { BcryptService } from "../service/bcrypt.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, LocalStrategy, BcryptService],
})

export class AuthModule {}