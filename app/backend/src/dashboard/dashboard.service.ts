import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async get(orgId: string, y: number, m: number) {
    const period = await this.prisma.reportPeriod.findUnique({
      where: { orgId_y_m: { orgId, y, m } }
    });

    const receiptsGrouped = await this.prisma.receipt.groupBy({
      by: ['status'],
      where: { orgId, periodId: period?.id || undefined },
      _count: { _all: true }
    });

    const receiptsByStatus = ['pendente', 'valido', 'invalido'].map((status) => {
      const match = receiptsGrouped.find((item) => item.status === status);
      return { status, count: match?._count._all ?? 0 };
    });

    const entriesByBrandRaw = await this.prisma.reportEntry.groupBy({
      by: ['brandId'],
      where: { orgId, periodId: period?.id || undefined },
      _sum: { total: true }
    });

    const brands = await this.prisma.brand.findMany({ where: { orgId } });
    const entriesByBrand = entriesByBrandRaw
      .map((entry) => ({
        brandId: entry.brandId,
        brand: brands.find((b) => b.id === entry.brandId)?.name || entry.brandId,
        total: Number(entry._sum.total || 0),
      }))
      .sort((a, b) => b.total - a.total);

    const partnersWithReceipts = await this.prisma.receipt.findMany({
      where: { orgId, periodId: period?.id || undefined, status: 'valido' },
      select: { partnerId: true },
      distinct: ['partnerId']
    });

    const partners = await this.prisma.partner.findMany({
      where: { orgId },
      select: { id: true, parceiro: true }
    });

    const sentIds = new Set(partnersWithReceipts.map((p) => p.partnerId).filter(Boolean) as string[]);
    const pendingPartners = partners
      .filter((partner) => !sentIds.has(partner.id))
      .map((partner) => ({ id: partner.id, name: partner.parceiro }));

    const coverage = {
      partnersTotal: partners.length,
      partnersSent: partners.length - pendingPartners.length,
      partnersPending: pendingPartners.length,
      pendingPartners,
    };

    const entriesByStore = await this.prisma.reportEntry.findMany({
      where: { orgId, periodId: period?.id || undefined },
      include: { store: true }
    });

    const ufAgg: Record<string, number> = {};
    entriesByStore.forEach((entry) => {
      const uf = entry.store?.uf?.toUpperCase() || 'NA';
      const total = Number(entry.total || 0);
      ufAgg[uf] = (ufAgg[uf] || 0) + total;
    });

    const entriesByUF = Object.entries(ufAgg)
      .map(([uf, total]) => ({ uf, total: Number(total) }))
      .sort((a, b) => b.total - a.total);

    return {
      period: { y, m, periodId: period?.id || null },
      receiptsByStatus,
      entriesByBrand,
      entriesByUF,
      coverage,
    };
  }
}
