import { PrismaClient } from '@prisma/client';
import requester from '../../src/utils/requester';

const prisma = new PrismaClient();
const apiUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';

async function main() {
  const response = await requester(apiUrl).get('/');
  const estadosBrasileiros = response.data;
  for (const estado of estadosBrasileiros) {

    await prisma.stateModel.create({
      data: {
        name: estado.nome,
        uf: estado.sigla
      }
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });