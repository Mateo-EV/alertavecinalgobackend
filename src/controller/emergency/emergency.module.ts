import { Module } from '@nestjs/common';
import { EmergencyController } from './emergency.controller';
import { EmergencyService } from './emergency.service';

@Module({
  controllers: [EmergencyController],
  providers: [EmergencyService],
})
export class EmergencyModule {}
