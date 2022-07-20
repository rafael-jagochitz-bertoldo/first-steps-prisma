import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { AppError } from './errors/appError'
import { routes } from './routes'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
export const app = express()

app.use(cors())

app.use(express.json())

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    res.status(err.statusCode).send({message: err.message})
  }

  console.log(err)

  return res.status(500).send({message: 'Internal server Error'})
})