import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    get(orgId: string, y: number, m: number): Promise<{
        period: {
            y: number;
            m: number;
            periodId: any;
        };
        receiptsByStatus: any;
        entriesByBrand: any;
        entriesByUF: {
            uf: string;
            total: string;
        }[];
        coverage: {
            partnersTotal: any;
            partnersSent: any;
            partnersPending: number;
        };
    }>;
}
