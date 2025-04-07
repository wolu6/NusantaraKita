import morgan from 'morgan';
import routes from './routes';
import prisma from './lib/prisma/config';
import express from 'express';

class App {
  public server;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.dbconn();
  }

  middlewares() {
    this.server.use(morgan('dev'));
    this.server.use(express.json());
    this.server.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      next();
    });
  }

  routes() {
    this.server.use(routes);
  }

  async dbconn() {
    try {
      await prisma.$connect();
      console.log('Connected to the database MYSQL with Prisma!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  }
}
const app = new App();
app.server.listen(1945, () => {
  console.log('Server is running on port http://localhost:1945');
});
