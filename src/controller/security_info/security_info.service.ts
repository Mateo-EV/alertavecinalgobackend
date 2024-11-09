import { Injectable } from "@nestjs/common"
import { db } from "src/db"

@Injectable()
export class SecurityInfoService {
  // RF20: Obtener todas las noticias de seguridad
  async getAllSecurityNews() {
    return await db.news.findMany({
      orderBy: {
        timestamp: "desc" // Ordenar las noticias de las más recientes a las más antiguas
      }
    })
  }

  // RF21: Obtener las últimas actualizaciones de noticias de seguridad
  async getLatestSecurityUpdates() {
    // Limitar a 5 noticias más recientes, como ejemplo
    return await db.news.findMany({
      orderBy: {
        timestamp: "desc"
      },
      take: 5
    })
  }
}
