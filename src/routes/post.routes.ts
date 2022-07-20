import { Router } from "express";
import { createPost, deletePostById, readAllPosts, readPostById, subLikePost, sumLikePost, updatePost } from "../controllers/post.controller";

export const postRouter = Router()

postRouter.post('/', createPost)
postRouter.get('/', readAllPosts)
postRouter.get('/:post_id', readPostById)
postRouter.patch('/:post_id', updatePost)
postRouter.patch('/sumLike/:post_id', sumLikePost)
postRouter.patch('/subLike/:post_id', subLikePost)
postRouter.delete('/:post_id', deletePostById)
