import { PrismaService } from '../prisma/prisma.service';
export declare class PartnerStoresService {
    private prisma;
    constructor(prisma: PrismaService);
    connect(orgId: string, partnerId: string, storeId: string): Promise<{
        id: string;
        connectedAt: Date;
        orgId: string;
        partnerId: string;
        storeId: string;
    }>;
    list(orgId: string, query: any): import(".prisma/client").Prisma.PrismaPromise<({
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
            localEntrega: string | null;
            endereco: string | null;
            municipio: string;
            uf: string;
            valor20l: import("@prisma/client/runtime/library").Decimal;
            valor10l: import("@prisma/client/runtime/library").Decimal;
            valor1500ml: import("@prisma/client/runtime/library").Decimal;
            valorCxCopo: import("@prisma/client/runtime/library").Decimal;
            valorVasilhame: import("@prisma/client/runtime/library").Decimal;
        };
    } & {
        id: string;
        connectedAt: Date;
        orgId: string;
        partnerId: string;
        storeId: string;
    })[]>;
    disconnect(orgId: string, id: string): import(".prisma/client").Prisma.Prisma__PartnerStoreClient<{
        id: string;
        connectedAt: Date;
        orgId: string;
        partnerId: string;
        storeId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
