import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtGuard } from '../common/jwt.guard';

@UseGuards(JwtGuard)
@Controller('reports')
export class ReportsController {
  constructor(private service: ReportsService) {}

  @Post('periods')
  createPeriod(@Req() req: any, @Body() dto: { y: number, m: number }) {
    return this.service.createPeriod(req.user.orgId, dto.y, dto.m);
  }

  @Get()
  list(@Req() req: any, @Query() query: any) {
    return this.service.list(req.user.orgId, query);
  }
}
