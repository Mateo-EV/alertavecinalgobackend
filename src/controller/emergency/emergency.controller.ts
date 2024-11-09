import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmergencyService } from './emergency.service';
import { EmergencyDto } from './emergency.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('emergency')
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('alert')
  async triggerEmergency(@Body() emergencyDto: EmergencyDto) {
    return this.emergencyService.triggerEmergency(emergencyDto);
  }
}
