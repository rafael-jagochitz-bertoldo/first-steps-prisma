import { NextFunction, Request, Response } from "express";
import { create, readAll, readById } from "../services/user.services";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body

  try {
    const user = await create(data)

    return res.send(user)
  } catch(e) {
    next(e)
  }
}

export const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await readAll()

    return res.send(users)
  } catch(e) {
    next(e)
  }
}

export const readUserById = async (req: Request, res: Response, next: NextFunction) => {
  const {user_id} = req.params
  try {
    const user = await readById(user_id)

    return res.send(user)
  } catch(e) {
    next(e)
  }
}