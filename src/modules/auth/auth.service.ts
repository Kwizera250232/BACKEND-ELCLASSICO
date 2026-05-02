import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto.auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.usersService.createCustomer(dto.email, dto.fullName, dto.password);
    return this.buildAuthResponse(user.id, user.email, user.role);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    if (!user || !bcrypt.compareSync(dto.password, user.passwordHash)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user.id, user.email, user.role);
  }

  private buildAuthResponse(userId: string, email: string, role: string) {
    const accessToken = this.jwtService.sign({ sub: userId, email, role });

    const refreshSecret = this.config.get<string>(
      'JWT_REFRESH_SECRET',
      'replace_me_refresh_secret',
    );
    const refreshExpiresIn = this.config.get<string>('JWT_REFRESH_EXPIRES_IN', '7d');

    const refreshToken = this.jwtService.sign(
      { sub: userId, email, role, type: 'refresh' },
      {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn,
      },
    );

    return {
      user: { id: userId, email, role },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
