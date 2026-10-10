import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DemoUserService } from '../../common/demo-user.service';
import { demoGoals } from '../../common/demo-data';
import { calculateGoalProgress } from '../dashboard/financial-calculations';

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService, private readonly demoUser: DemoUserService) {}
  async findAll() {
    try {
      const user = await this.demoUser.getUser();
      const goals = await this.prisma.goal.findMany({ where: { userId: user.id }, orderBy: { targetDate: 'asc' } });
      return goals.map(goal => ({ ...goal, currentAmount: Number(goal.currentAmount), targetAmount: Number(goal.targetAmount), progress: calculateGoalProgress(Number(goal.currentAmount), Number(goal.targetAmount)) }));
    } catch {
      return demoGoals.map(goal => ({ ...goal, currentAmount: Number(goal.currentAmount), targetAmount: Number(goal.targetAmount), progress: Number(goal.progress) }));
    }
  }
}
