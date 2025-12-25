import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { BcryptService } from './bcrypt.service';

export interface UserDTO {
  userId: string;
  username: string;
  name: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private userService: UserService, private bcrypt: BcryptService) {}

  async login(userDTO: UserDTO): Promise<{ accessToken: string }> {
    try {
      // Here you would normally verify the username and password against your user database
      const jwt = this.jwtService.sign(userDTO);
      return { accessToken: jwt };
    } catch (error) {
      throw new UnauthorizedException('Verification failed');
    }
  }

   async validateUserNamePassword(username: string, password: string): Promise<UserDTO | null> {
    const user = await this.userService.findUser(username);
    if (user && await this.bcrypt.comparePasswords(password, user.password)) {
      return { userId: user.id, username: username, name: user.name };
    }
    return null;
  }
}