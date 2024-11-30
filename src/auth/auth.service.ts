import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/database/database.service';
import { LoginDto } from './dto/login.dto';
import { TokensDto } from './dto/tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(loginDto: LoginDto): Promise<TokensDto> {
    try {
      const { email, password } = loginDto;

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid email');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      return this.createTokens(user.id);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async refreshAccessToken(id: string): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.signAsync(
      { sub: id },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '10m',
      },
    );

    return { accessToken };
  }

  private async createTokens(id: string): Promise<TokensDto> {
    const accessToken = await this.jwtService.signAsync(
      { sub: id },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '10m',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { sub: id },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '60m',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
