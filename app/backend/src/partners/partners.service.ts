import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}
  list(orgId: string, query:any){
    const { estado, cidade } = query;
    return this.prisma.partner.findMany({ where: { orgId, estado: estado || undefined, cidade: cidade || undefined },
      orderBy: [{ estado:'asc' }, { cidade:'asc' }, { parceiro:'asc' }]});
  }
  create(orgId: string, data:any){ return this.prisma.partner.create({ data: { ...data, orgId } }); }
}
