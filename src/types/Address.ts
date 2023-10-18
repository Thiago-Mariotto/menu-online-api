import DistrictService from '../services/address/district/DistrictService';
import StateService from '../services/address/state/StateService';
import CityService from '../services/address/city/CityService';

export type TViaCepAddress = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export type TOutputApiServiceAddress = {
  cep: string;
  street: string;
  districtName: string;
  cityName: string;
  stateName: string;
}

export type TInputAddress = {
  cep: string;
  street: string;
  districtId: string;
}

export type TInputSaveAddress = {
  districtName: string,
  cityId: string
} & Omit<TInputAddress, 'districtId'>;

export type TDistrictInput = {
  name: string;
  cityId: string;
}

export type TDistrictCreated = {
  districtId: string,
  name: string,
  cityId: string
}

export type TAddressServices = {
  districtService: DistrictService,
  stateService: StateService,
  cityService: CityService
}

export type TOutputStateModel = {
  stateId: string,
  name: string,
  uf: string
}

export type TOutputAddressModel = {
  addressId: string;
  cep: string;
  street: string;
  districtId: string;
}

export type TOutputCityModel = {
  cityId: string,
  name: string,
  stateId: string
}

export type TEagerDistrictOutput = {
  City: {
      State: {
          stateId: string;
          name: string;
          uf: string;
      };
  } & {
      cityId: string;
      name: string;
      stateId: string;
  };
} & {
  districtId: string;
  name: string;
  cityId: string;
}