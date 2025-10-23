import { PrismaService } from '../prisma/prisma.service';
export declare class PartnersService {
    private prisma;
    constructor(prisma: PrismaService);
    list(orgId: string, query: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        orgId: string;
        email: string | null;
        estado: string;
        cidade: string;
        parceiro: string;
        distribuidora: string | null;
        cnpjCpf: string | null;
        telefone: string | null;
    }[]>;
    create(orgId: string, data: any): import(".prisma/client").Prisma.Prisma__PartnerClient<{
        id: string;
        orgId: string;
        email: string | null;
        estado: string;
        cidade: string;
        parceiro: string;
        distribuidora: string | null;
        cnpjCpf: string | null;
        telefone: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
