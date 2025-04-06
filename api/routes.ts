import { Request, Response, Router } from 'express';
import ProvinsiControllers from './module/controllers/provinsi-controller';
import KabupatenKotaControllers from './module/controllers/kabupaten-kota-controller';

const routes = Router();
const provinsi = new ProvinsiControllers();
const kabupatenKota = new KabupatenKotaControllers();

routes.get('/', (req: Request, res: Response): void => {
	res.status(200).json({ message: 'Welcome to the API' });
});

routes.get('/provinsi', (req: Request, res: Response) => provinsi.Get(req, res));
routes.get('/kab-kota', (req: Request, res: Response) => kabupatenKota.Get(req, res));

export default routes;
