import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { JwtGuard } from '../common/jwt.guard';
@UseGuards(JwtGuard)
@Controller('receipts')
export class ReceiptsController {
  constructor(private service: ReceiptsService) {}
  @Post() create(@Req() req:any, @Body() body:any){ return this.service.create(req.user.orgId, body); }
  @Get() list(@Req() req:any, @Query() query:any){ return this.service.list(req.user.orgId, query); }
  @Patch(':id') update(@Req() req:any, @Param('id') id:string, @Body() body:any){ return this.service.update(req.user.orgId, id, body); }
}
