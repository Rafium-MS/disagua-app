import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { JwtGuard } from '../common/jwt.guard';
import { CreatePartnerDto } from './dto';

@UseGuards(JwtGuard)
@Controller('partners')
export class PartnersController {
  constructor(private service: PartnersService) {}

  @Get()
  list(@Req() req: any, @Query() query: any) {
    return this.service.list(req.user.orgId, query);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreatePartnerDto) {
    return this.service.create(req.user.orgId, dto);
  }
}
