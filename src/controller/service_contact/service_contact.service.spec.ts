import { Test, TestingModule } from '@nestjs/testing';
import { ServiceContactService } from './service_contact.service';

describe('ServiceContactService', () => {
  let service: ServiceContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceContactService],
    }).compile();

    service = module.get<ServiceContactService>(ServiceContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
