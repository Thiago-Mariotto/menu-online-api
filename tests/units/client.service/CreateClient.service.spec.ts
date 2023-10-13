import ClientMemoryRepository from '../../../src/repositories/client/ClientMemoryRepository';
import CreateClientService from '../../../src/services/client/CreateClient.service';
import { validClient } from '../../mocks/client.mock';

describe('# Unit - Services => CreateClient', () => {
  let createClientService: CreateClientService;
  let clientRepository = new ClientMemoryRepository();
  beforeEach(() => {
    createClientService = new CreateClientService(clientRepository);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create a valid client', async () => {
    clientRepository.findByEmail = jest.fn().mockResolvedValue(null);

    const client = await createClientService.execute(validClient);
    expect(client).toHaveProperty('clientId');
    expect(client.clientId.length).toBe(36);
  });

  test('should not create a client with an existing email', async () => {
    clientRepository.findByEmail = jest.fn().mockResolvedValue(validClient);

    await expect(createClientService.execute(validClient)).rejects.toThrow(
      'Client already exists'
    );
  });

  test('should not create a client with an invalid email', async () => {
    clientRepository.findByEmail = jest.fn().mockResolvedValue(null);

    await expect(
      createClientService.execute({ ...validClient, email: 'invalidEmail' })
    ).rejects.toThrow('Invalid Email');
  });
});