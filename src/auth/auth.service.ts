import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private readonly users = [
    { userId: 1, username: "usuario", password: "1234" }
  ]

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }

  async validateUser(username: string, password: string) {
    const user = this.users.find(
      user => user.username === username && user.password === password
    )
    if (!user) {
      throw new UnauthorizedException("Credenciales inválidas")
    }
    // Retorna el usuario sin la contraseña
    const { password: _, ...result } = user
    return result
  }
}
