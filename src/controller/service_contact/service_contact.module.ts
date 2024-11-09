import { Module } from '@nestjs/common';
import { ServiceContactService } from './service_contact.service';
import { ServiceContactController } from './service_contact.controller';

@Module({
  controllers: [ServiceContactController],
  providers: [ServiceContactService]
})
export class ServiceContactModule {}
