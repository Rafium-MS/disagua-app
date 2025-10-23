import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}
  createPeriod(orgId: string, y:number, m:number){
    return this.prisma.reportPeriod.upsert({ where: { orgId_y_m: { orgId, y, m } }, create: { orgId, y, m }, update: {} });
  }
  async list(orgId: string, query:any){
    const { start, end, brand } = query;
    const entries = await this.prisma.reportEntry.findMany({
      where: { orgId, brandId: brand || undefined, data: { gte: start ? new Date(start) : undefined, lte: end ? new Date(end) : undefined } },
      include: { brand: true, store: true, period: true }
    });
    const totals = entries.reduce((acc:any, e:any) => { acc.total = (acc.total || 0) + Number(e.total || 0); return acc; }, {});
    return { totals, count: entries.length, entries };
  }
}
