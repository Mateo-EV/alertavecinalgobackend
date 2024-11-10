import { Injectable } from "@nestjs/common"
import { db } from "src/db"

@Injectable()
export class UserService {
  async getUsers(userId: string) {
    return await db.user.findMany({
      where: { id: { not: userId } },
      select: {
        id: true,
        last_name: true,
        first_name: true,
        dni: true,
        address: true,
        email: true,
        phone: true,
        registration_date: true
      }
    })
  }
}
