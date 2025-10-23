import { PrismaService } from '../prisma/prisma.service';
export declare class PartnerStoresService {
    private prisma;
    constructor(prisma: PrismaService);
    connect(orgId: string, partnerId: string, storeId: string): Promise<any>;
    list(orgId: string, query: any): any;
    disconnect(orgId: string, id: string): any;
}
