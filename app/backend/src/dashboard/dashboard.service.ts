import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async get(orgId: string, y: number, m: number) {
    const period = await this.prisma.reportPeriod.findUnique({
      where: { orgId_y_m: { orgId, y, m } }
    });

    const receiptsByStatus = await this.prisma.receipt.groupBy({
      by: ['status'],
      where: { orgId, periodId: period?.id || undefined },
      _count: { _all: true }
    });

    const entriesByBrand = await this.prisma.reportEntry.groupBy({
      by: ['brandId'],
      where: { orgId, periodId: period?.id || undefined },
      _sum: { total: true }
    });

    const brands = await this.prisma.brand.findMany({ where: { orgId } });
    const entriesByBrandNamed = entriesByBrand.map((e: typeof entriesByBrand[number]) => ({
      brandId: e.brandId,
      brand: (brands.find((b: typeof brands[number]) => b.id === e.brandId)?.name) || e.brandId,
      total: String(e._sum.total || 0)
    }));

    const partnersWithReceipts = await this.prisma.receipt.findMany({
      where: { orgId, periodId: period?.id || undefined, status: 'valido' },
      select: { partnerId: true },
      distinct: ['partnerId']
    });

    const totalPartners = await this.prisma.partner.count({ where: { orgId } });
    const sent = partnersWithReceipts.filter((p: typeof partnersWithReceipts[number]) => !!p.partnerId).length;
    const coverage = { partnersTotal: totalPartners, partnersSent: sent, partnersPending: totalPartners - sent };

    const byUF = await this.prisma.reportEntry.findMany({
      where: { orgId, periodId: period?.id || undefined },
      include: { store: true }
    });

    const ufAgg: Record<string, number> = {};
    byUF.forEach((entry: typeof byUF[number]) => {
      const uf = entry.store?.uf || 'NA';
      ufAgg[uf] = (ufAgg[uf] || 0) + Number(entry.total || 0);
    });

    const entriesByUF = Object.entries(ufAgg).map(([uf, total]) => ({ uf, total: String(total) }));
    return { period: { y, m, periodId: period?.id || null }, receiptsByStatus, entriesByBrand: entriesByBrandNamed, entriesByUF, coverage };
  }
}
