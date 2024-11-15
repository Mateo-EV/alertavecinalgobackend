import { Module } from '@nestjs/common';
import { IncidentController } from './controllerincident.controller';
import { IncidentService } from './incident.service';

@Module({
  controllers: [IncidentController],
  providers: [IncidentService],
})
export class IncidentModule {}
