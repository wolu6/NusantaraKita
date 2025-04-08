import { Request, Response, Router } from 'express'
import V2 from './V2'

const routes = Router()

routes.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Welcome to the API' })
})

routes.use('/v2', V2)

export default routes
