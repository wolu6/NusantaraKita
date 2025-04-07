import { Request, Response, Router } from 'express';
import ProvinsiControllers from '../../module/controllers/provinsi-controller';
import KabupatenKotaControllers from '../../module/controllers/kabupaten-kota-controller';

const V2 = Router();
const provinsi = new ProvinsiControllers();
const kabupatenKota = new KabupatenKotaControllers();

V2.get('/provinsi', (req: Request, res: Response) => provinsi.Get(req, res));
V2.get('/kab-kota', (req: Request, res: Response) => kabupatenKota.Get(req, res));
V2.get('/:kode/kab-kota', async (req: Request, res: Response) => {
	await kabupatenKota.GetByProvinsi(req, res);
});

export default V2;
