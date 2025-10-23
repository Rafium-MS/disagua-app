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
                orgId: string;
                name: string;
                codDisagua: string | null;
            };
            store: {
                id: string;
                orgId: string;
                name: string;
                brandId: string;
                valor20l: import("@prisma/client/runtime/library").Decimal;
                valor10l: import("@prisma/client/runtime/library").Decimal;
                valor1500ml: import("@prisma/client/runtime/library").Decimal;
                valorCxCopo: import("@prisma/client/runtime/library").Decimal;
                valorVasilhame: import("@prisma/client/runtime/library").Decimal;
                uf: string;
                localEntrega: string | null;
                endereco: string | null;
                municipio: string;
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
            storeId: string;
            brandId: string;
            periodId: string;
            data: Date;
            valor20l: import("@prisma/client/runtime/library").Decimal;
            valor10l: import("@prisma/client/runtime/library").Decimal;
            valor1500ml: import("@prisma/client/runtime/library").Decimal;
            valorCxCopo: import("@prisma/client/runtime/library").Decimal;
            valorVasilhame: import("@prisma/client/runtime/library").Decimal;
            total: import("@prisma/client/runtime/library").Decimal;
        })[];
    }>;
}
