import { Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PartnerStoresService } from './partner-stores.service';
import { JwtGuard } from '../common/jwt.guard';

@UseGuards(JwtGuard)
@Controller('partner-stores')
export class PartnerStoresController {
  constructor(private service: PartnerStoresService) {}

  @Get()
  list(@Req() req: any, @Query() query: any) {
    return this.service.list(req.user.orgId, query);
  }

  @Post(':partnerId/:storeId')
  connect(@Req() req: any, @Param('partnerId') partnerId: string, @Param('storeId') storeId: string) {
    return this.service.connect(req.user.orgId, partnerId, storeId);
  }

  @Delete(':id')
  disconnect(@Req() req: any, @Param('id') id: string) {
    return this.service.disconnect(req.user.orgId, id);
  }
}
