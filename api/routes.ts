import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response): void => {
	res.status(200).json({ message: 'Welcome to the API' });
});

export default routes
