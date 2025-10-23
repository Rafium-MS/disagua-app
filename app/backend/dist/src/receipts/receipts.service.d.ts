import { PrismaService } from '../prisma/prisma.service';
export declare class ReceiptsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(orgId: string, data: any): any;
    list(orgId: string, query: any): any;
    update(orgId: string, id: string, data: any): any;
}
