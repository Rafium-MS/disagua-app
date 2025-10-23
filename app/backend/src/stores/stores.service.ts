import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}

  list(orgId: string, query: any) {
    const { uf, municipio, brand } = query;
    return this.prisma.store.findMany({
      where: {
        orgId,
        uf: uf || undefined,
        municipio: municipio || undefined,
        brandId: brand || undefined
      },
      include: { brand: true },
      orderBy: [{ municipio: 'asc' }, { name: 'asc' }]
    });
  }

  create(orgId: string, data: any) {
    return this.prisma.store.create({ data: { ...data, orgId } });
  }
}
