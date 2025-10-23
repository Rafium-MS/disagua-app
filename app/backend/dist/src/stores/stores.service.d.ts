import { PrismaService } from '../prisma/prisma.service';
export declare class StoresService {
    private prisma;
    constructor(prisma: PrismaService);
    list(orgId: string, query: any): import(".prisma/client").Prisma.PrismaPromise<({
        brand: {
            id: string;
            orgId: string;
            name: string;
            codDisagua: string | null;
        };
    } & {
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
    })[]>;
    create(orgId: string, data: any): import(".prisma/client").Prisma.Prisma__StoreClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
