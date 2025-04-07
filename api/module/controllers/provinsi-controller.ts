import { Request, Response } from 'express';
import ProvinsiServices from '../../module/services/provinsi-service';

class ProvinsiControllers {
  private provinsiService: ProvinsiServices;

  constructor() {
    this.provinsiService = new ProvinsiServices();
  }

  async Get(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const halaman = parseInt(req.query.halaman as string) || 1;
      const pagination = req.query.pagination === 'false' ? false : true;
      const data = await this.provinsiService.Get(limit, halaman, pagination);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProvinsiControllers;
