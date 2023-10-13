import CityService from '../city/CityService';
import DistrictService from '../district/DistrictService';
import StateService from '../state/StateService';
import { TAddressServices } from '../../../types/Address';
import PrismaStateRepository from '../../../repositories/address/state/adapters/PrismaStateRepository';
import PrismaCityRepository from '../../../repositories/address/city/adapters/PrismaCityRepository';
import PrismaDistrictRepository from '../../../repositories/address/district/adapters/PrismaDistrictRepository';


export default class AddressServiceBuilder {
  private static services: TAddressServices;

  static buildAddressServices() {
    if (!AddressServiceBuilder.services) {
      AddressServiceBuilder.services = {
        cityService: new CityService(
          new PrismaCityRepository()
        ),
        districtService: new DistrictService(
          new PrismaDistrictRepository()
        ),
        stateService: new StateService(
          new PrismaStateRepository()
        )
      };
    }
    return AddressServiceBuilder.services;
  }
}