import { Module } from '@nestjs/common';
import { AchievementService } from './achievement.service.js';
import { AchievementController } from './achievement.controller.js';

@Module({
  providers: [AchievementService],
  controllers: [AchievementController]
})
export class AchievementModule {}
