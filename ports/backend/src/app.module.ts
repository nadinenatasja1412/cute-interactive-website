import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AchievementModule } from './achievement/achievement.module.js';
import { SecretariatModule } from './secretariat/secretariat.module.js';

@Module({
  imports: [AchievementModule, SecretariatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
