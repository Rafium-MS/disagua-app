import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto';
export declare class StoresController {
    private service;
    constructor(service: StoresService);
    list(req: any, query: any): import(".prisma/client").Prisma.PrismaPromise<({
        brand: {
            id: string;
            name: string;
            orgId: string;
            codDisagua: string | null;
        };
    } & {
        id: string;
        name: string;
        orgId: string;
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
    })[]>;
    create(req: any, dto: CreateStoreDto): import(".prisma/client").Prisma.Prisma__StoreClient<{
        id: string;
        name: string;
        orgId: string;
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
