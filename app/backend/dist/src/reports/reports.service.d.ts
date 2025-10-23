import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPeriod(orgId: string, y: number, m: number): any;
    list(orgId: string, query: any): Promise<{
        totals: any;
        count: any;
        entries: any;
    }>;
}
