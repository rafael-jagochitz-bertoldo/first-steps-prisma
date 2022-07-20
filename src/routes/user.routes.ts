import { Router } from "express";
import { createUser, readAllUsers, readUserById } from "../controllers/user.controller";

export const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', readAllUsers)
userRouter.get('/:user_id', readUserById)