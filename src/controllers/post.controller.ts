import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { create, deletePost, readAll, readById, subLike, sumLike, update } from "../services/posts.services";

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body

  try {
    const post = await create(data)

    return res.send(post)
  } catch (e) {
    next(e)
  }
}

export const readAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await readAll()

    return res.send(posts)
  } catch (e) {
    next(e)
  }
}

export const readPostById = async (req: Request, res: Response, next: NextFunction) => {
  const { post_id } = req.params

  try {
    const post = await readById(post_id)

    return res.send(post)
  } catch (e) {
    next(e)
  }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body
  const { post_id } = req.params

  try {
    const post = await update(data, post_id)

    return res.send(post)
  } catch(e) {
    next(e)
  }
}

export const sumLikePost = async (req: Request, res: Response, next: NextFunction) => {
  const {post_id} = req.params

  try {
    const post = await sumLike(post_id)

    return res.send(post)
  } catch (e) {
    next(e)
  }
}

export const subLikePost = async (req: Request, res: Response, next: NextFunction) => {
  const {post_id} = req.params

  try {
    const post = await subLike(post_id)

    return res.send(post)
  } catch (e) {
    next(e)
  }
}

export const deletePostById = async (req: Request, res: Response, next: NextFunction) => {
  const {post_id} = req.params

  try {
    const deletedPost = await deletePost(post_id)

    return res.status(200).send({
      message: "Post deleted with succes"
    })
  } catch(e) {
    next(e)
  }
}