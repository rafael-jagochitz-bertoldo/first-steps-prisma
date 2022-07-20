import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appError"
import authConfig from '../config/auth'
import { verify } from "jsonwebtoken"

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export const ensureAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if(!authHeader) {
    throw new AppError("token de autorização não informado", 401)
  }

  try {
    const [, token] = authHeader.split(' ')
    const {secret} = authConfig.jwt

    const decoded = verify(token, secret)
    const {sub} = decoded as TokenPayload

    req.user = {
      id: sub
    }

    return next()
  } catch(e) {
    throw new AppError('token expirado ou enviado de forma inválida')
  }
}