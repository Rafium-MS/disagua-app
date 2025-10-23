import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto';
export declare class StoresController {
    private service;
    constructor(service: StoresService);
    list(req: any, query: any): import(".prisma/client").Prisma.PrismaPromise<({
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
    create(req: any, dto: CreateStoreDto): import(".prisma/client").Prisma.Prisma__StoreClient<{
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
