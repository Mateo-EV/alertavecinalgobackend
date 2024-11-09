import { Controller, Post, Get, Body } from '@nestjs/common';
import { IncidentService } from './incident.service';

@Controller('incidents')
export class IncidentController  {

    constructor(private readonly incidentService: IncidentService) {}

    @Post('register')
    createIncident(@Body() incidentData: any) {
        return this.incidentService.createIncident(incidentData);
    }

    @Get('all')
    getIncidents() {
        return this.incidentService.getIncidents();
    }
}
 