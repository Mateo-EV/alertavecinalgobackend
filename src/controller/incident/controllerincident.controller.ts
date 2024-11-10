import {
  Controller,
  Post,
  Get,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request
} from "@nestjs/common"
import { IncidentService } from "./incident.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"

@Controller("incidents")
export class IncidentController {
  constructor(private readonly incidentService: IncidentService) {}

  @UseGuards(JwtAuthGuard)
  @Post("register")
  @UseInterceptors(FileInterceptor("file"))
  createIncident(
    @Body() incidentData: any,
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ) {
    console.log(file)

    return this.incidentService.createIncident(incidentData, file, req.user.id)
  }

  @Get("all")
  getIncidents() {
    return this.incidentService.getIncidents()
  }
}
