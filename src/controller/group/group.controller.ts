import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Param
} from "@nestjs/common"
import { GroupService } from "./group.service"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // Endpoint para crear un nuevo grupo
  @Post("create")
  async createGroup(
    @Body("userId") userId: string,
    @Body("groupName") groupName: string,
    @Body("description") description?: string
  ) {
    return this.groupService.createGroup(userId, groupName, description)
  }

  // Endpoint para unirse a un grupo usando el código
  @Post("join")
  async joinGroup(@Body("userId") userId: string, @Body("code") code: string) {
    return this.groupService.joinGroup(userId, code)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getMyGroups(@Request() req) {
    return this.groupService.getMyGroups(req.user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async getGroup(@Param() params: any) {
    return this.groupService.getMyGroups(params.id)
  }
}
