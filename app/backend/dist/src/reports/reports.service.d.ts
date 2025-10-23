import { PrismaService } from '../prisma/prisma.service';
export declare class ReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPeriod(orgId: string, y: number, m: number): import(".prisma/client").Prisma.Prisma__ReportPeriodClient<{
        id: string;
        orgId: string;
        y: number;
        m: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    list(orgId: string, query: any): Promise<{
        totals: any;
        count: number;
        entries: ({
            store: {
                id: string;
                orgId: string;
                name: string;
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
            brand: {
                id: string;
                orgId: string;
                name: string;
                codDisagua: string | null;
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
