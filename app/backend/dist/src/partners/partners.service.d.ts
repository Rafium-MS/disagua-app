import { PrismaService } from '../prisma/prisma.service';
export declare class PartnersService {
    private prisma;
    constructor(prisma: PrismaService);
    list(orgId: string, query: any): any;
    create(orgId: string, data: any): any;
}
