import { Module } from '@nestjs/common';
import { SecurityInfoService } from './security_info.service';
import { SecurityInfoController } from './security_info.controller';

@Module({
  controllers: [SecurityInfoController],
  providers: [SecurityInfoService]
})
export class SecurityInfoModule {}
