import { PrismaClient } from '@prisma/client';
import CityService from '../city/CityService';
import DistrictService from '../district/DistrictService';
import StateService from '../state/StateService';
import { TAddressServices } from '../../../types/Address';

export default class AddressServiceBuilder {
  private static _orm? : PrismaClient;
  private static services: TAddressServices;

  static buildAddressServices() {
    if (!AddressServiceBuilder._orm) {
      AddressServiceBuilder._orm = new PrismaClient();
    }
    if (!AddressServiceBuilder.services) {
      AddressServiceBuilder.services = {
        cityService: new CityService(
          AddressServiceBuilder._orm
        ),
        districtService: new DistrictService(
          AddressServiceBuilder._orm
        ),
        stateService: new StateService(
          AddressServiceBuilder._orm
        )
      };
    }
    return AddressServiceBuilder.services;
  }
}