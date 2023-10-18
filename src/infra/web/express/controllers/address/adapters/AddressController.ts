import { NextFunction, Request, Response } from 'express';
import IAddressController from '../ports/IAddressController';
import CacheAddressService from '../../../../../../services/address/CacheAddressService';
import { IService } from '../../../../../../services/IService';
import { TOutputApiServiceAddress } from '../../../../../../types/Address';
import ViaCepAddressFetcher from '../../../../../../services/viaCep/ViaCepAddressFetcher.service';
import InMemoryAddressRepository from '../../../../../../repositories/address/adapters/InMemoryAddressRepository';


class AddressController implements IAddressController<Request, Response, NextFunction> {

  constructor(
  
  private readonly addressService: IService<string, TOutputApiServiceAddress> = new CacheAddressService(
    new ViaCepAddressFetcher(),
    new InMemoryAddressRepository()
  )
  ) { }
  
  async registerAddress(req: Request, res: Response): Promise<void | Response> {
    const { cep } = req.body;
    const response = await this.addressService.execute(cep);
    return res.status(201).json(response);
  }
}

export default AddressController;