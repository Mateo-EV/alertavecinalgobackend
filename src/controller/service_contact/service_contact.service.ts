import { Injectable } from "@nestjs/common"
import { db } from "src/db"

@Injectable()
export class ServiceContactService {
  // RF18: Obtener contactos de emergencia
  async getEmergencyContacts() {
    return await db.serviceContact.findMany({
      where: {
        service_type: { in: ["bomberos", "ambulancia", "policia"] }
      }
    })
  }

  // RF19: Obtener centros de ayuda cercanos
  async getNearbyCenters(lat: number, lon: number, radius: number) {
    // Aquí puedes agregar más lógica para obtener datos externos o usar APIs de terceros.
    const nearbyCenters = await db.serviceContact.findMany()

    // Filtrar servicios cercanos basados en la ubicación proporcionada (lógica simple).
    // Si necesitas más precisión, usa una API de geolocalización avanzada.
    const results = nearbyCenters.filter(center => {
      const distance = this.calculateDistance(lat, lon, center.lat, center.lon)
      return distance <= radius
    })

    return results
  }

  // Método para calcular la distancia entre dos coordenadas geográficas (Haversine Formula)
  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371 // Radio de la Tierra en km
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distancia en km
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }
}
