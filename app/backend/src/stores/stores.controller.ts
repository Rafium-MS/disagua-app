import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { JwtGuard } from '../common/jwt.guard';
import { CreateStoreDto } from './dto';

@UseGuards(JwtGuard)
@Controller('stores')
export class StoresController {
  constructor(private service: StoresService) {}

  @Get()
  list(@Req() req: any, @Query() query: any) {
    return this.service.list(req.user.orgId, query);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateStoreDto) {
    return this.service.create(req.user.orgId, dto);
  }
}
