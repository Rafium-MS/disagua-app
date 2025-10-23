import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReceiptsService {
  constructor(private prisma: PrismaService) {}

  create(orgId: string, data: any) {
    return this.prisma.receipt.create({ data: { ...data, orgId } });
  }

  list(orgId: string, query: any) {
    const { status, period, brand, store, partner } = query;
    return this.prisma.receipt.findMany({
      where: {
        orgId,
        status: status || undefined,
        periodId: period || undefined,
        brandId: brand || undefined,
        storeId: store || undefined,
        partnerId: partner || undefined,
      },
      orderBy: { uploadedAt: 'desc' },
    });
  }

  async update(orgId: string, id: string, data: any) {
    const result = await this.prisma.receipt.updateMany({ where: { id, orgId }, data });
    if (result.count === 0) {
      throw new NotFoundException('Receipt not found');
    }
    return this.prisma.receipt.findFirstOrThrow({ where: { id, orgId } });
  }
}
