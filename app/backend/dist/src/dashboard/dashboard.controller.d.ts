import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private service;
    constructor(service: DashboardService);
    get(req: any, y?: string, m?: string): Promise<{
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
