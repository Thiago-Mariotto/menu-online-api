import requester from 'supertest';
import app from '../../../src/infra/web/express/app';
import IClientRepository from '../../../src/repositories/client/IClientRepository';
import ClientMemoryRepository from '../../../src/repositories/client/adapters/ClientMemoryRepository';
import CreateClientService from '../../../src/services/client/CreateClient.service';
import FetchClientByIdService from '../../../src/services/client/FetchClientById.service';
import { validClient } from '../../mocks/client.mock';

let clientRepository: IClientRepository;
let createClientService: CreateClientService;
let fetchClientById: FetchClientByIdService;
describe('# Integration - Client - Create', function () {
  beforeEach(function () {
    clientRepository = new ClientMemoryRepository();
    createClientService = new CreateClientService(clientRepository);
    fetchClientById = new FetchClientByIdService(clientRepository);
  });

  afterEach(function () {
    jest.clearAllMocks();
  });

  test('should be possible create user success', async function () {
    const response = await requester(app)
      .post('/api/clients')
      .send(validClient)

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('clientId');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Client created successfully');
  });

  test('should be possible create client with invalid name', async function () {
    const response = await requester(app)
      .post('/api/clients')
      .send({ ...validClient, name: 'a' })

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid Name');
  });

  test('should be possible create client with invalid email', async function () {
    const response = await requester(app)
      .post('/api/clients')
      .send({ ...validClient, email: 'a.mail.com' })

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid Email');
  });
});