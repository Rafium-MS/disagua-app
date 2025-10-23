import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtGuard } from '../common/jwt.guard';
@UseGuards(JwtGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private service: DashboardService) {}
  @Get()
  get(@Req() req:any, @Query('y') y?:string, @Query('m') m?:string){
    const now = new Date(); const yy = y ? parseInt(y) : now.getUTCFullYear(); const mm = m ? parseInt(m) : (now.getUTCMonth()+1);
    return this.service.get(req.user.orgId, yy, mm);
  }
}
