import { PrismaService } from '../prisma/prisma.service';
export declare class BrandsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(orgId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        orgId: string;
        codDisagua: string | null;
    }[]>;
    create(orgId: string, data: {
        name: string;
        codDisagua?: string;
    }): import(".prisma/client").Prisma.Prisma__BrandClient<{
        id: string;
        name: string;
        orgId: string;
        codDisagua: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
