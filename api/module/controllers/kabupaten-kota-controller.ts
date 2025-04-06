import { Request, Response } from 'express';
import KabupatenKotaService from '../../module/services/kabupaten-kota-service';

class KabupatenKotaControllers {
  private kabupatenKotaService: KabupatenKotaService;

  constructor() {
    this.kabupatenKotaService = new KabupatenKotaService();
  }

  async Get(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const halaman = parseInt(req.query.halaman as string) || 1;
      const data = await this.kabupatenKotaService.Get(limit, halaman);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async GetByProvinsi(req: Request, res: Response) {
    try {
      const kode = req.params.kode;
      const limit = parseInt(req.query.limit as string) || 10;
      const halaman = parseInt(req.query.halaman as string) || 1;

      if (!kode) {
        return res.status(400).json({ error: 'Kode provinsi diperlukan' });
      }

      const data = await this.kabupatenKotaService.GetByProvinsi(kode, limit, halaman);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default KabupatenKotaControllers;
