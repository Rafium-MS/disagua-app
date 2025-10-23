import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    get(orgId: string, y: number, m: number): Promise<{
        period: {
            y: number;
            m: number;
            periodId: string | null;
        };
        receiptsByStatus: {
            status: string;
            count: number;
        }[];
        entriesByBrand: {
            brandId: string;
            brand: string;
            total: number;
        }[];
        entriesByUF: {
            uf: string;
            total: number;
        }[];
        coverage: {
            partnersTotal: number;
            partnersSent: number;
            partnersPending: number;
            pendingPartners: {
                id: string;
                name: string;
            }[];
        };
    }>;
}
