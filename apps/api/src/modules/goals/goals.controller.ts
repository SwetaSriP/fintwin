import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GoalsService } from './goals.service';

@ApiTags('goals')
@Controller('goals')
export class GoalsController {
  constructor(private readonly service: GoalsService) {}
  @Get()
  getGoals() { return this.service.findAll(); }
}
