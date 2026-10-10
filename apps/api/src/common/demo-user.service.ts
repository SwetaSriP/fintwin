import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DemoUserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser() {
    const email = process.env.DEMO_USER_EMAIL ?? 'demo@fintwin.local';
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException(`Demo user ${email} is not seeded`);
    return user;
  }
}
