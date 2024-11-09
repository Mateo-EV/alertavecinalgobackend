import { Test, TestingModule } from '@nestjs/testing';
import { SecurityInfoService } from './security_info.service';

describe('SecurityInfoService', () => {
  let service: SecurityInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecurityInfoService],
    }).compile();

    service = module.get<SecurityInfoService>(SecurityInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
