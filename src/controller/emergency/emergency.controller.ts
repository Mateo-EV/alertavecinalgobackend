import { Controller, Post, Body, UseGuards, Request, Get } from "@nestjs/common"
import { EmergencyService } from "./emergency.service"
import { EmergencyDto } from "./emergency.dto"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"

@Controller("emergency")
export class EmergencyController {
  constructor(private readonly emergencyService: EmergencyService) {}

  @UseGuards(JwtAuthGuard)
  @Post("alert")
  async triggerEmergency(@Body() emergencyDto: EmergencyDto, @Request() req) {
    return this.emergencyService.triggerEmergency(emergencyDto, req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async isUserInEmergency(@Request() req) {
    return this.emergencyService.isUserInEmergency(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post("cancel")
  async cancelEmergency(@Request() req) {
    await this.emergencyService.cancelEmergency(req.user.id)
    return "canceled"
  }
}
