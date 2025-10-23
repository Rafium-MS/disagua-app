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
        receiptsByStatus: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.ReceiptGroupByOutputType, "status"[]> & {
            _count: {
                _all: number;
            };
        })[];
        entriesByBrand: {
            brandId: string;
            brand: string;
            total: string;
        }[];
        entriesByUF: {
            uf: string;
            total: string;
        }[];
        coverage: {
            partnersTotal: number;
            partnersSent: number;
            partnersPending: number;
        };
    }>;
}
