import { PrismaService } from '../prisma/prisma.service';
export declare class BrandsService {
    private prisma;
    constructor(prisma: PrismaService);
    list(orgId: string): any;
    create(orgId: string, data: {
        name: string;
        codDisagua?: string;
    }): any;
}
