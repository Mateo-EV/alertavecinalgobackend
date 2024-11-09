import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "+EaqwnkGTCsT66yGrBRIu3JUwPcqqBJzkHe/LKZo2Ts="
    })
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      dni: payload.dni,
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone: payload.phone,
      address: payload.address,
      email: payload.email
    }
  }
}
