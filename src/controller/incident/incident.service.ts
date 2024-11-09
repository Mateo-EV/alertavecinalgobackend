import { Injectable } from "@nestjs/common"
import { db } from "src/db"

@Injectable()
export class IncidentService {
  async createIncident(incidentData: any) {
    return await db.incident.create({
      data: {
        user_id: incidentData.user_id,
        incident_type: incidentData.incident_type,
        description: incidentData.description,
        location_lat: incidentData.location_lat,
        location_lon: incidentData.location_lon,
        multimedia: incidentData.multimedia
      }
    })
  }

  async getIncidents() {
    return await db.incident.findMany()
  }
}
