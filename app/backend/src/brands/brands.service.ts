import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class BrandsService { constructor(private prisma: PrismaService) {}
  list(orgId: string){ return this.prisma.brand.findMany({ where:{ orgId }, orderBy:{ name:'asc' } }); }
  create(orgId: string, data:{ name:string; codDisagua?: string }){ return this.prisma.brand.create({ data:{ ...data, orgId } }); }
}
