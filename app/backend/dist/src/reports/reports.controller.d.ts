import { ReportsService } from './reports.service';
export declare class ReportsController {
    private service;
    constructor(service: ReportsService);
    createPeriod(req: any, dto: {
        y: number;
        m: number;
    }): any;
    list(req: any, query: any): Promise<{
        totals: any;
        count: any;
        entries: any;
    }>;
}
