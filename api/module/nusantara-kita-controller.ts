import { Request, Response } from 'express';
import NusantaraKitaService from './nusantara-kita-service';

class NusantaraKitaController {
  private nusantaraKitaService: NusantaraKitaService;

  constructor() {
    this.nusantaraKitaService = new NusantaraKitaService();
  }

  async getAll(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.page as string) || 1;
      const data = await this.nusantaraKitaService.getAll(limit, page);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default NusantaraKitaController;
