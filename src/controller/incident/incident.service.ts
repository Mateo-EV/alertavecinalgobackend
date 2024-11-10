import { BadRequestException, Injectable } from "@nestjs/common"
import { db } from "src/db"
import { utapi } from "src/utapi"

@Injectable()
export class IncidentService {
  async createIncident(
    incidentData: any,
    file: Express.Multer.File,
    userId: string
  ) {
    const blob = new Blob([file.buffer], { type: file.mimetype })
    const fileC = new File([blob], file.filename, { type: file.mimetype })
    const uploadedFile = await utapi.uploadFiles(fileC)

    if (uploadedFile.error) throw new BadRequestException("Could not upload")

    return await db.incident.create({
      data: {
        user_id: userId,
        incident_type: incidentData.incident_type,
        description: incidentData.description,
        location_lat: Number(incidentData.location_lat),
        location_lon: Number(incidentData.location_lon),
        multimedia: uploadedFile.data.url
      }
    })
  }

  async getIncidents() {
    return await db.incident.findMany()
  }
}
