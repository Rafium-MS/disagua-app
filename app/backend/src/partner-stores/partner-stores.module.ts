import { Module } from '@nestjs/common';
import { PartnerStoresService } from './partner-stores.service';
import { PartnerStoresController } from './partner-stores.controller';

@Module({ providers: [PartnerStoresService], controllers: [PartnerStoresController] })
export class PartnerStoresModule {}
