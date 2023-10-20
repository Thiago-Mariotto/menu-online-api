import { NextFunction, Request, Response } from 'express';
import AddressMemoryRepository from '../../../../../../repositories/address/adapters/AddressMemoryRepository';
import { IService } from '../../../../../../services/IService';
import CacheAddressService from '../../../../../../services/address/CacheAddressService';
import ViaCepAddressFetcher from '../../../../../../services/viaCep/ViaCepAddressFetcher.service';
import { TOutputApiServiceAddress } from '../../../../../../types/Address';
import IAddressController from '../ports/IAddressController';


class AddressController implements IAddressController<Request, Response, NextFunction> {

  constructor(

    private readonly addressService: IService<string, TOutputApiServiceAddress> = new CacheAddressService(
      new ViaCepAddressFetcher(),
      new AddressMemoryRepository()
    )
  ) { }

  async registerAddress(req: Request, res: Response): Promise<void | Response> {
    const { cep } = req.body;
    const response = await this.addressService.execute(cep);
    return res.status(201).json(response);
  }
}

export default AddressController;