import { PrismaService } from '../prisma/prisma.service';
export declare class PartnersService {
    private prisma;
    constructor(prisma: PrismaService);
    list(orgId: string, query: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        orgId: string;
        email: string | null;
        parceiro: string;
        distribuidora: string | null;
        cnpjCpf: string | null;
        telefone: string | null;
        cidade: string;
        estado: string;
    }[]>;
    create(orgId: string, data: any): import(".prisma/client").Prisma.Prisma__PartnerClient<{
        id: string;
        orgId: string;
        email: string | null;
        parceiro: string;
        distribuidora: string | null;
        cnpjCpf: string | null;
        telefone: string | null;
        cidade: string;
        estado: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
