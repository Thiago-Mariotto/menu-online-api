import InMemoryCityRepository from '../../../repositories/address/city/adapters/InMemoryCityRepository';
import PrismaCityRepository from '../../../repositories/address/city/adapters/PrismaCityRepository';
import InMemoryDistrictRepository from '../../../repositories/address/district/adapters/InMemoryDistrictRepository';
import PrismaDistrictRepository from '../../../repositories/address/district/adapters/PrismaDistrictRepository';
import InMemoryStateRepository from '../../../repositories/address/state/adapters/InMemoryStateRepository';
import PrismaStateRepository from '../../../repositories/address/state/adapters/PrismaStateRepository';
import { TAddressServices } from '../../../types/Address';
import CityService from '../city/CityService';
import DistrictService from '../district/DistrictService';
import StateService from '../state/StateService';

export default class AddressServiceBuilder {
  private static services: TAddressServices;

  static buildAddressServices() {
    const nodeEnv = process.env.NODE_ENV;
    const cityRepository = nodeEnv == 'test' ? new InMemoryCityRepository() : new PrismaCityRepository();
    const districtRepository = nodeEnv == 'test' ? new InMemoryDistrictRepository() : new PrismaDistrictRepository();
    const stateRepository = nodeEnv == 'test' ? new InMemoryStateRepository() : new PrismaStateRepository();

    if (!AddressServiceBuilder.services) {
      AddressServiceBuilder.services = {
        cityService: new CityService(cityRepository),
        districtService: new DistrictService(districtRepository),
        stateService: new StateService(stateRepository)
      };
    }
    return AddressServiceBuilder.services;
  }
}