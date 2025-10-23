import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { JwtGuard } from '../common/jwt.guard';
import { CreateBrandDto } from './dto';

@UseGuards(JwtGuard)
@Controller('brands')
export class BrandsController {
  constructor(private service: BrandsService) {}

  @Get()
  list(@Req() req: any) {
    return this.service.list(req.user.orgId);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateBrandDto) {
    return this.service.create(req.user.orgId, dto);
  }
}
