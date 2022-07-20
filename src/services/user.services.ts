import { hash } from "bcryptjs"
import { prisma } from "../app"
import { AppError } from "../errors/appError"

interface IUserCreateData {
  username: string
  password: string
}

interface IUserResponseData {
  id: string
  username: string
  posts: {
    id: string
    content: string
    image: string
    likes: number
    userId: string
  }[]
}

export const create = async (data: IUserCreateData): Promise<IUserResponseData> => {
  const checkUser = await prisma.user.findUnique({where: {username: data.username}})

  if(checkUser) {
    throw new AppError('username already exists')
  }

  const hashedPass = await hash(data.password, 8)

  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: hashedPass
    },
    include: {
      posts: true
    }
  })

  const {password, ...response} = user

  return response
}

export const readAll = async (): Promise<IUserResponseData[]> => {
  const users = await prisma.user.findMany({include: {posts: true}})

  const response: IUserResponseData[] = []

  users.forEach(element => {
    const {password, ...elemntResponse} = element

    response.push(elemntResponse)
  })

  return response
}

export const readById = async (user_id: string) => {
  const user = await prisma.user.findUnique({where: {id: user_id}})

  if(!user) {
    throw new AppError('User not found', 404)
  }

  const {password, ...response} = user

  return response
}