/* eslint-disable max-lines-per-function */
import { PrismaClient } from '@prisma/client';
import { addresses, categories, cities, clientAddresses, clients, districts, payments, states, users } from './seed.data';
const prismaClient = new PrismaClient();

async function main() {
  const newStates = prismaClient
    .stateModel.createMany({ data: states });

  const newCities = prismaClient
    .cityModel.createMany({ data: cities });

  const newDistricts = prismaClient
    .districtModel.createMany({ data: districts });

  const newCategories = prismaClient
    .categoryModel.createMany({ data: categories });

  const newAddresses = prismaClient
    .addressModel.createMany({ data: addresses });

  const newUsers = prismaClient
    .userModel.createMany({ data: users });

  const newClientAddresses = prismaClient
    .clientAddressModel.createMany({ data: clientAddresses });

  const newClients = prismaClient
    .clientModel.createMany({ data: clients });

  const newPayments = prismaClient
    .paymentModel.createMany({ data: payments });

  await prismaClient.$transaction([newStates, newCities, newDistricts]);
  await prismaClient.$transaction([newAddresses, newCategories, newPayments, newUsers, newClientAddresses, newClients]);
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
