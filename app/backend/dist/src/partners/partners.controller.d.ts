import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto';
export declare class PartnersController {
    private service;
    constructor(service: PartnersService);
    list(req: any, query: any): import(".prisma/client").Prisma.PrismaPromise<{
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
    create(req: any, dto: CreatePartnerDto): import(".prisma/client").Prisma.Prisma__PartnerClient<{
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
