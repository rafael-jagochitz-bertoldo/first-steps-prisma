import { prisma } from "../app"
import { AppError } from "../errors/appError"

interface ICreatePostData {
  content: string
  image: string
  likes: number
  userId: string
}

interface IUpdatePostData {
  content?: string
  image?: string
}

interface IResponsePostData {
  id: string
  content: string
  image: string
  likes: number
  comments: {
    id: string
    content: string
  }[]
}

export const create = async (data: ICreatePostData): Promise<IResponsePostData> => {
  const post = await prisma.post.create({
    data: {
      content: data.content,
      image: data.image,
      likes: 0,
      userId: data.userId
    },
    include: {
      comments: true
    }
  })

  const {userId, ...response} = post

  return response
}

export const readAll = async (): Promise<IResponsePostData[]> => {
  const posts = await prisma.post.findMany({
    include: {
      comments: true
    }
  })

  const response: IResponsePostData[] = []

  posts.forEach(post => {
    const {userId, ...postResponse} = post

    response.push(postResponse)
  })

  return response
}

export const readById = async (post_id: string) => {
  const checkPost = await prisma.post.findUnique({
    where: {
      id: post_id
    }, 
    include: {
      comments: true
    }})

  if(!checkPost) {
    throw new AppError('Post not found', 404)
  }

  const {userId, ...response} = checkPost

  return response
}

export const update = async (data: IUpdatePostData, post_id: string): Promise<IResponsePostData> => {
  const checkPost = await prisma.post.findUnique({
    where: {
      id: post_id
    }
  })

  if(!checkPost) {
    throw new AppError('Post not found', 404)
  }

  const updatePost = await prisma.post.update({
    where: {
      id: post_id
    },
    data,
    include: {
      comments: true
    }
  })

  const {userId, ...response} = updatePost

  return response
}

export const sumLike = async (post_id: string): Promise<IResponsePostData> => {
  const checkPost = await prisma.post.findUnique({
    where: {
      id: post_id
    }
  })

  if(!checkPost) {
    throw new AppError('Post not found', 404)
  }

  let count = checkPost.likes

  count++

  const updateLike = await prisma.post.update({
    where: {
      id: post_id
    },
    data: {
      likes: count
    },
    include: {
      comments: true
    }
  })

  const {userId, ...response} = updateLike

  return response
}

export const subLike = async (post_id: string): Promise<IResponsePostData> => {
  const checkPost = await prisma.post.findUnique({
    where: {
      id: post_id
    }
  })

  if(!checkPost) {
    throw new AppError('Post not found', 404)
  }

  let count = checkPost.likes

  if(count > 0) {
    count--
  }

  const updateLike = await prisma.post.update({
    where: {
      id: post_id
    },
    data: {
      likes: count
    },
    include: {
      comments: true
    }
  })

  const {userId, ...response} = updateLike

  return response
}

export const deletePost = async (post_id: string) => {
  const checkPost = await prisma.post.findUnique({
    where: {
      id: post_id
    }
  })

  if(!checkPost) {
    throw new AppError('Post not found', 404)
  }

  const deletedPost = await prisma.post.delete({
    where: {
      id: post_id
    }
  })

  return deletePost
}