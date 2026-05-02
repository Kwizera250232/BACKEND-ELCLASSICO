import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  createCustomer(email: string, fullName: string, password: string): Promise<User> {
    const passwordHash = bcrypt.hashSync(password, 12);

    return this.prisma.user.create({
      data: {
        email,
        fullName,
        passwordHash,
        role: Role.CUSTOMER,
      },
    });
  }
}
