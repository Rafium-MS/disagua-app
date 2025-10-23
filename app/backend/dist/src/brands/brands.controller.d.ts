import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto';
export declare class BrandsController {
    private service;
    constructor(service: BrandsService);
    list(req: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        orgId: string;
        codDisagua: string | null;
    }[]>;
    create(req: any, dto: CreateBrandDto): import(".prisma/client").Prisma.Prisma__BrandClient<{
        id: string;
        name: string;
        orgId: string;
        codDisagua: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
