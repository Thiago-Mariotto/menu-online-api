import express, { Request, Response } from 'express';
import AddressController from './controllers/address/adapters/AddressController';

const app = express();

app.use(express.json());

const addressController = new AddressController();

app.post('/', (req: Request, res: Response) => addressController.registerAddress(req, res));

app.listen(3000, () => console.log('Server is running on port 3000'));