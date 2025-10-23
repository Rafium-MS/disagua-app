import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private service;
    constructor(service: DashboardService);
    get(req: any, y?: string, m?: string): Promise<{
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
