import { Injectable } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma.service';

type BootstrapAdminInput = {
  email: string;
  fullName: string;
  password: string;
};

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

  async ensureBootstrapAdmin(input: BootstrapAdminInput): Promise<User> {
    const existing = await this.findByEmail(input.email);

    if (existing) {
      if (existing.role !== Role.ADMIN) {
        return this.prisma.user.update({
          where: { id: existing.id },
          data: {
            role: Role.ADMIN,
            fullName: input.fullName,
          },
        });
      }

      return existing;
    }

    const passwordHash = bcrypt.hashSync(input.password, 12);

    return this.prisma.user.create({
      data: {
        email: input.email,
        fullName: input.fullName,
        passwordHash,
        role: Role.ADMIN,
      },
    });
  }
}
