import { Injectable } from '@nestjs/common';
import { db } from '../../db';
import { EmergencyDto } from './emergency.dto';

@Injectable()
export class EmergencyService {
  async triggerEmergency(emergencyDto: EmergencyDto) {
    const { userId, locationLat, locationLon } = emergencyDto;

    // Buscar los grupos del usuario
    const userGroups = await db.groupUser.findMany({
      where: { user_id: userId },
      include: { group: true },
    });

    if (userGroups.length === 0) {
      throw new Error('El usuario no pertenece a ningún grupo.');
    }

    // Obtener los ID de los grupos
    const groupIds = userGroups.map((groupUser) => groupUser.group_id);

    // Crear la alerta para cada grupo
    for (const groupId of groupIds) {
      await db.alert.create({
        data: {
          user_id: userId,
          alert_type: 'emergencia',
          location_lat: locationLat,
          location_lon: locationLon,
          status: 'activa',
          group_id: groupId,
        },
      });

      // Enviar notificación a los usuarios del grupo
      const groupUsers = await db.groupUser.findMany({
        where: { group_id: groupId },
        include: { user: true },
      });

      groupUsers.forEach((groupUser) => {
        console.log(`Notificación enviada a ${groupUser.user.email}: Emergencia activada`);
      });
    }

    // Iniciar grabación de multimedia (lógica simulada)
    console.log('Iniciando grabación de audio/video en segundo plano...');

    return {
      message: 'Botón de emergencia activado. Alerta enviada a los miembros del grupo.',
    };
  }
}
