import { Test, TestingModule } from '@nestjs/testing';
import { ServiceContactController } from './service_contact.controller';

describe('ServiceContactController', () => {
  let controller: ServiceContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceContactController],
    }).compile();

    controller = module.get<ServiceContactController>(ServiceContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
