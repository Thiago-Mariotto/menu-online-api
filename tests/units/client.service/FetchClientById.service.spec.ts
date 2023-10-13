import ClientMemoryRepository from '../../../src/repositories/client/adapters/ClientMemoryRepository';
import FetchClientByIdService from '../../../src/services/client/FetchClientById.service';
import { clientFromDb } from '../../mocks/client.mock';

describe('# Unit - services => FetchClientById', () => {
  let createClientService: FetchClientByIdService;
  let clientRepository = new ClientMemoryRepository();
  beforeEach(() => {
    createClientService = new FetchClientByIdService(clientRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should fetch a client by id', async () => {
    clientRepository.findById = jest.fn().mockResolvedValue(clientFromDb);
    const client = await createClientService.execute(clientFromDb.clientId);
    expect(client).toEqual(clientFromDb);
  });

  test('should throw an error if client does not exist', async () => {
    clientRepository.findById = jest.fn().mockResolvedValue(null);
    await expect(createClientService.execute(clientFromDb.clientId)).rejects.toThrow('Client id 391f699f-b27a-403b-b8c4-4c7c94219b7d not found');
  });

  test('should throw an error if client id is not valid', async () => {
    await expect(createClientService.execute('invalid-id')).rejects.toThrow('Client id invalid-id not found');
  });
});