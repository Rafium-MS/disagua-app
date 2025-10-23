import { ReportsService } from './reports.service';
export declare class ReportsController {
    private service;
    constructor(service: ReportsService);
    createPeriod(req: any, dto: {
        y: number;
        m: number;
    }): import(".prisma/client").Prisma.Prisma__ReportPeriodClient<{
        id: string;
        orgId: string;
        y: number;
        m: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    list(req: any, query: any): Promise<{
        totals: any;
        count: number;
        entries: ({
            brand: {
                id: string;
                name: string;
                orgId: string;
                codDisagua: string | null;
            };
            store: {
                id: string;
                name: string;
                orgId: string;
                uf: string;
                municipio: string;
                brandId: string;
                localEntrega: string | null;
                endereco: string | null;
                valor20l: import("@prisma/client/runtime/library").Decimal;
                valor10l: import("@prisma/client/runtime/library").Decimal;
                valor1500ml: import("@prisma/client/runtime/library").Decimal;
                valorCxCopo: import("@prisma/client/runtime/library").Decimal;
                valorVasilhame: import("@prisma/client/runtime/library").Decimal;
            };
            period: {
                id: string;
                orgId: string;
                y: number;
                m: number;
            };
        } & {
            id: string;
            orgId: string;
            data: Date;
            brandId: string;
            valor20l: import("@prisma/client/runtime/library").Decimal;
            valor10l: import("@prisma/client/runtime/library").Decimal;
            valor1500ml: import("@prisma/client/runtime/library").Decimal;
            valorCxCopo: import("@prisma/client/runtime/library").Decimal;
            valorVasilhame: import("@prisma/client/runtime/library").Decimal;
            storeId: string;
            periodId: string;
            total: import("@prisma/client/runtime/library").Decimal;
        })[];
    }>;
}
