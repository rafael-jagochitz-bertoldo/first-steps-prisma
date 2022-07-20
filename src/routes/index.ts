import { Router } from "express";
import { postRouter } from "./post.routes";
import { userRouter } from "./user.routes";

export const routes = Router()

routes.use('/user', userRouter)
routes.use('/post', postRouter)