import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./jwt.strategy"
import { LocalStrategy } from "./local.strategy"

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: "+EaqwnkGTCsT66yGrBRIu3JUwPcqqBJzkHe/LKZo2Ts=",
      signOptions: { expiresIn: "1h" }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
