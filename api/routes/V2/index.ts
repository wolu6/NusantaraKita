import { Request, Response, Router } from 'express'
import ProvinsiControllers from '../../module/controllers/provinsi-controller'
import KabupatenKotaControllers from '../../module/controllers/kabupaten-kota-controller'
import KecamatanControllers from '../../module/controllers/kecamatan-controller'
import DesaKelurahanControllers from '../../module/controllers/desa_kelurahan-controller'

const V2 = Router()
const provinsi = new ProvinsiControllers()
const kabupatenKota = new KabupatenKotaControllers()
const kecamatan = new KecamatanControllers()
const desaKelurahan = new DesaKelurahanControllers()

V2.get('/provinsi', (req: Request, res: Response) => provinsi.Get(req, res))
V2.get('/kab-kota', (req: Request, res: Response) =>
  kabupatenKota.Get(req, res)
)
V2.get('/:kode/kab-kota', async (req: Request, res: Response) => {
  await kabupatenKota.GetByProvinsi(req, res)
})
V2.get('/kecamatan', (req: Request, res: Response) => kecamatan.Get(req, res))
V2.get('/:kode/kecamatan', async (req: Request, res: Response) => {
  await kecamatan.GetByKabKota(req, res)
})
V2.get('/desa-kel', (req: Request, res: Response) =>
  desaKelurahan.Get(req, res)
)
V2.get('/:kode/desa-kel', async (req: Request, res: Response) => {
  await desaKelurahan.GetByKecamatan(req, res)
})

export default V2
