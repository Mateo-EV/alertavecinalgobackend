import { Test, TestingModule } from '@nestjs/testing';
import { SecurityInfoController } from './security_info.controller';

describe('SecurityInfoController', () => {
  let controller: SecurityInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecurityInfoController],
    }).compile();

    controller = module.get<SecurityInfoController>(SecurityInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
