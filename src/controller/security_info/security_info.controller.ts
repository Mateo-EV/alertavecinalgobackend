import { Controller, Get, Query } from '@nestjs/common';
import { SecurityInfoService } from './security_info.service';

@Controller('security_info')
export class SecurityInfoController {
    constructor(private readonly securityInfoService: SecurityInfoService) {}

    // RF20: Obtener información en línea sobre temas de seguridad y alertas de la zona
    @Get('news')
    async getAllSecurityNews(){
        return this.securityInfoService.getAllSecurityNews();
    }

    // RF21: Actualizar y obtener noticias de seguridad más recientes
    @Get('latest')
    async getLatestSecurityUpdates() {
        return this.securityInfoService.getLatestSecurityUpdates();
    }
}
