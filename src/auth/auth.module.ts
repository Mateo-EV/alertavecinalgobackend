import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { env } from "src/config"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./local.strategy"
import { JwtStrategy } from "./jwt.strategy"

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.JWT_TOKEN_SECRET,
      signOptions: { expiresIn: "1h" }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
