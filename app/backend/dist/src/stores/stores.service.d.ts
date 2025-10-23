import { PrismaService } from '../prisma/prisma.service';
export declare class StoresService {
    private prisma;
    constructor(prisma: PrismaService);
    list(orgId: string, query: any): any;
    create(orgId: string, data: any): any;
}
