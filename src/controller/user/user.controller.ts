import { Controller, Get, Request, UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Request() req) {
    const data = await this.userService.getUsers(req.user.id)

    return data
  }
}
