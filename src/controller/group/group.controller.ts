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

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async createGroup(
    @Request() req,
    @Body("userIds") userIds: string[],
    @Body("groupName") groupName: string,
    @Body("description") description?: string
  ) {
    const ids = [req.user.id, ...userIds]

    return this.groupService.createGroup(ids, groupName, description)
  }

  @UseGuards(JwtAuthGuard)
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
    return this.groupService.getGroup(params.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post("message")
  async sendMessage(
    @Request() req,
    @Body("content") content: string,
    @Body("groupId") groupId: string
  ) {
    return this.groupService.sendMessage(req.user.id, content, groupId)
  }
}
