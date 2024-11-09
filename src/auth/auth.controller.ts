import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { JwtAuthGuard } from "./jwt-auth.guard"
import { LocalAuthGuard } from "./local-auth.guard"

// DTO para el registro de usuario
class CreateUserDto {
  dni: string
  password: string
  first_name: string
  last_name: string
  phone: string
  address: string
  email: string
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user
  }

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    const { dni, first_name, last_name, phone, address, email, password } =
      createUserDto

    const user = await this.authService.createUser(
      dni,
      first_name,
      last_name,
      phone,
      address,
      email,
      password
    )

    return user
  }
}
