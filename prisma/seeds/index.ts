// import { PrismaClient } from '@prisma/client';
// import { addresses, cities, districts, states, users } from './seed.data';
// const prismaClient = new PrismaClient();

// async function main() {
// const newStates = prismaClient
//   .stateModel.createMany({ data: states });

// const newCities = prismaClient
//   .cityModel.createMany({ data: cities });

// const newDistricts = prismaClient
//   .districtModel.createMany({ data: districts });

// const newUsers = prismaClient
//   .userModel.createMany({ data: users });

// const newAddresses = prismaClient
//   .addressModel.createMany({ data: addresses });

// await prismaClient.$transaction([newStates, newCities, newDistricts, newUsers, newAddresses]);
// }

// main()
//   .then(async () => {
//     await prismaClient.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prismaClient.$disconnect();
//     process.exit(1);
//   });
