import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { JwtGuard } from '../common/jwt.guard';
import { PresignDto } from './dto';
@UseGuards(JwtGuard)
@Controller('uploads')
export class FilesController {
  constructor(private files: FilesService) {}
  @Post('presign')
  async presign(@Req() req:any, @Body() dto: PresignDto){
    const now = new Date();
    const y = dto.y || String(now.getUTCFullYear());
    const m = dto.m || String(now.getUTCMonth()+1);
    const key = this.files.buildObjectKey(req.user.orgId, y, m, dto.uf, dto.municipio, dto.partnerId, dto.storeId, dto.filename);
    return this.files.presignPut({ orgId: req.user.orgId, key, contentType: dto.contentType });
  }
}
