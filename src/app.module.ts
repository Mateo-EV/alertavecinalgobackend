import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AuthModule } from "./auth/auth.module"
import { ConfigModule } from "@nestjs/config"
import { IncidentModule } from "./controller/incident/incident.module"
import { GroupModule } from "./controller/group/group.module"
import { EmergencyModule } from "./controller/emergency/emergency.module"
import { ServiceContactModule } from "./controller/service_contact/service_contact.module"
import { SecurityInfoModule } from "./controller/security_info/security_info.module"
import { UserModule } from "./controller/user/user.module"

@Module({
  imports: [
    IncidentModule,
    GroupModule,
    ConfigModule.forRoot(),
    EmergencyModule,
    ServiceContactModule,
    SecurityInfoModule,
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
