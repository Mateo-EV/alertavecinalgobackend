import { Controller, Get, Query } from '@nestjs/common';
import { ServiceContactService } from './service_contact.service';

@Controller('service_contact')
export class ServiceContactController {
  constructor(private readonly serviceContactService: ServiceContactService) {}

  // RF18: Obtener directorio de números de emergencia
  @Get('emergency_contacts')
  async getEmergencyContacts() {
    return this.serviceContactService.getEmergencyContacts();
  }

  // RF19: Obtener centros de ayuda cercanos
  @Get('nearby_centers')
  async getNearbyCenters(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('radius') radius: number
  ) {
    return this.serviceContactService.getNearbyCenters(lat, lon, radius);
  }
}
