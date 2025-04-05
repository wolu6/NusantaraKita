import { Request, Response, Router } from 'express';
import NusantaraKitaController from './module/nusantara-kita-controller';

const routes = Router();
const data = new NusantaraKitaController();

routes.get('/', (req: Request, res: Response): void => {
	res.status(200).json({ message: 'Welcome to the API' });
});

routes.get('/data', (req: Request, res: Response) => data.getAll(req, res));

export default routes;
