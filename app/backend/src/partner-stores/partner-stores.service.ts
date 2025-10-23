import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class PartnerStoresService {
  constructor(private prisma: PrismaService) {}
  async connect(orgId: string, partnerId: string, storeId: string){
    try {
      return await this.prisma.partnerStore.create({ data: { orgId, partnerId, storeId } });
    } catch (e: any) {
      if (e.code === 'P2002') throw new ConflictException('Loja já vinculada a outro parceiro');
      throw e;
    }
  }
  list(orgId: string, query:any){
    const { estado, cidade } = query;
    return this.prisma.partnerStore.findMany({
      where: { orgId, partner: { estado: estado || undefined, cidade: cidade || undefined } },
      include: { partner: true, store: { include: { brand: true } } }
    });
  }
  disconnect(orgId: string, id: string){
    return this.prisma.partnerStore.delete({ where: { orgId_id: { orgId, id } } });
  }
}
