import { Request, Response } from 'express'
import DesaKelurahanServices from '../../module/services/desa-kelurahan-service'

class DesaKelurahanControllers {
  private desaKelurahanService: DesaKelurahanServices

  constructor() {
    this.desaKelurahanService = new DesaKelurahanServices()
  }

  async Get(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10
      const halaman = parseInt(req.query.halaman as string) || 1
      const data = await this.desaKelurahanService.Get(limit, halaman)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async GetByKecamatan(req: Request, res: Response) {
    try {
      const kode = req.params.kode
      const limit = parseInt(req.query.limit as string) || 10
      const pagination = req.query.pagination === 'false' ? false : true
      const halaman = parseInt(req.query.halaman as string) || 1

      if (!kode) {
        return res.status(400).json({ error: 'Kode provinsi diperlukan' })
      }

      const data = await this.desaKelurahanService.GetByKecamatan(
        kode,
        limit,
        halaman,
        pagination
      )
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default DesaKelurahanControllers
