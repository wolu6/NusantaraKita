import { Request, Response } from 'express';
import KecamatanServices from '../../module/services/kecamatan-service';

class KecamatanControllers {
  private kecamatanService: KecamatanServices;

  constructor() {
    this.kecamatanService = new KecamatanServices();
  }

  async Get(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const halaman = parseInt(req.query.halaman as string) || 1;
      const data = await this.kecamatanService.Get(limit, halaman);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async GetByKabKota(req: Request, res: Response) {
    try {
      const kode = req.params.kode;
      const limit = parseInt(req.query.limit as string) || 10;
      const pagination = req.query.pagination === 'false' ? false : true;
      const halaman = parseInt(req.query.halaman as string) || 1;

      if (!kode) {
        return res.status(400).json({ error: 'Kode kabupaten/kota diperlukan' });
      }

      const data = await this.kecamatanService.GetByKabKota(kode, limit, halaman, pagination);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default KecamatanControllers;
