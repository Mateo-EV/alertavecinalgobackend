import { Injectable } from "@nestjs/common"
import { db } from "../../db"

@Injectable()
export class GroupService {
  // Método para crear un grupo
  async createGroup(userId: string, groupName: string, description?: string) {
    const code = crypto.randomUUID().split("-")[0] // Generar un código único para el grupo

    const group = await db.group.create({
      data: {
        name: groupName,
        description,
        code,
        groupUsers: {
          create: {
            user_id: userId
          }
        }
      }
    })

    return group
  }

  // Método para unirse a un grupo usando el código
  async joinGroup(userId: string, code: string) {
    const group = await db.group.findUnique({
      where: { code },
      include: { groupUsers: true }
    })

    if (!group) {
      throw new Error("El grupo no existe")
    }

    // Verifica si el usuario ya es miembro del grupo
    const isMember = group.groupUsers.some(user => user.user_id === userId)
    if (isMember) {
      throw new Error("Ya eres miembro de este grupo")
    }

    // Añadir al usuario al grupo
    await db.groupUser.create({
      data: {
        user_id: userId,
        group_id: group.id
      }
    })

    return group
  }
}