import { Request, Response, Router } from 'express';
import ProvinsiControllers from './module/controllers/provinsi-controller';

const routes = Router();
const data = new ProvinsiControllers();

routes.get('/', (req: Request, res: Response): void => {
	res.status(200).json({ message: 'Welcome to the API' });
});

routes.get('/provinsi', (req: Request, res: Response) => data.Get(req, res));

export default routes;
