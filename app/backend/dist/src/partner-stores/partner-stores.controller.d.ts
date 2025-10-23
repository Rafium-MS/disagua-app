import { PartnerStoresService } from './partner-stores.service';
export declare class PartnerStoresController {
    private service;
    constructor(service: PartnerStoresService);
    list(req: any, query: any): import(".prisma/client").Prisma.PrismaPromise<({
        partner: {
            id: string;
            orgId: string;
            parceiro: string;
            distribuidora: string | null;
            cnpjCpf: string | null;
            telefone: string | null;
            email: string | null;
            cidade: string;
            estado: string;
        };
        store: {
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
    } & {
        id: string;
        orgId: string;
        partnerId: string;
        storeId: string;
        connectedAt: Date;
    })[]>;
    connect(req: any, partnerId: string, storeId: string): Promise<{
        id: string;
        orgId: string;
        partnerId: string;
        storeId: string;
        connectedAt: Date;
    }>;
    disconnect(req: any, id: string): import(".prisma/client").Prisma.Prisma__PartnerStoreClient<{
        id: string;
        orgId: string;
        partnerId: string;
        storeId: string;
        connectedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
