import { PrismaClient } from '@prisma/client';
import requester from '../../src/utils/requester';

const prisma = new PrismaClient();

async function main() {
  const states = await prisma.stateModel.findMany();
  for (const state of states) {
    const response = await requester('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').get(`${state.uf}/distritos`);
    const districts = response.data;
    for (const district of districts) {
      console.log('populating city: ', district.nome);
      await prisma.cityModel.create({
        data: {
          name: district.nome,
          stateId: state.stateId
        }
      });
    }
  }
}

main();