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
