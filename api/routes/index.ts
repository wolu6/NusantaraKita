import { Request, Response, Router } from 'express'
import V2 from './V2'
import prisma from '../lib/prisma/config'

const routes = Router()

routes.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Welcome to the API' })
})

routes.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'disconnected', error: error.message });
  }
});

routes.use('/v2', V2)

export default routes
