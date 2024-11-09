import { Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import { db } from "src/db"

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = {
      dni: user.dni,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      address: user.address,
      email: user.email,
      sub: user.id
    }

    return {
      access_token: this.jwtService.sign(payload),
      session: {
        dni: user.dni,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name
      }
    }
  }

  async validateUser(dni: string, password: string) {
    const user = await db.user.findUnique({
      where: {
        dni
      }
    })

    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!user || !isCorrectPassword) {
      throw new UnauthorizedException("Credenciales inválidas")
    }

    const { password: _, ...result } = user
    return result
  }

  async createUser(
    dni: string,
    first_name: string,
    last_name: string,
    phone: number,
    address: string,
    email: string,
    password: string
  ) {
    const existingUser = await db.user.findUnique({
      where: { dni }
    })

    if (existingUser) {
      throw new UnauthorizedException("El usuario ya existe")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await db.user.create({
      data: {
        dni,
        first_name,
        last_name,
        phone,
        address,
        email,
        password: hashedPassword
      }
    })

    const { password: _, ...result } = user
    return result
  }
}
