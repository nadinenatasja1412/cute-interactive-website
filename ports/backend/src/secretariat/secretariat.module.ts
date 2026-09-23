import { Module } from '@nestjs/common';
import { SecretariatService } from './secretariat.service.js';
import { SecretariatController } from './secretariat.controller.js';

@Module({
  providers: [SecretariatService],
  controllers: [SecretariatController]
})
export class SecretariatModule {}
