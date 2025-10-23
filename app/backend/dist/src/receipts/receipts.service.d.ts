import { PrismaService } from '../prisma/prisma.service';
export declare class ReceiptsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(orgId: string, data: any): import(".prisma/client").Prisma.Prisma__ReceiptClient<{
        id: string;
        orgId: string;
        partnerId: string | null;
        storeId: string | null;
        brandId: string | null;
        periodId: string | null;
        uploadedById: string | null;
        uploadedAt: Date;
        objectKey: string;
        filename: string;
        fileExt: string | null;
        sizeBytes: number | null;
        quantidade: import("@prisma/client/runtime/library").Decimal | null;
        dataComprovante: Date | null;
        assinaturaOk: boolean | null;
        status: import(".prisma/client").$Enums.ReceiptStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    list(orgId: string, query: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        orgId: string;
        partnerId: string | null;
        storeId: string | null;
        brandId: string | null;
        periodId: string | null;
        uploadedById: string | null;
        uploadedAt: Date;
        objectKey: string;
        filename: string;
        fileExt: string | null;
        sizeBytes: number | null;
        quantidade: import("@prisma/client/runtime/library").Decimal | null;
        dataComprovante: Date | null;
        assinaturaOk: boolean | null;
        status: import(".prisma/client").$Enums.ReceiptStatus;
    }[]>;
    update(orgId: string, id: string, data: any): import(".prisma/client").Prisma.Prisma__ReceiptClient<{
        id: string;
        orgId: string;
        partnerId: string | null;
        storeId: string | null;
        brandId: string | null;
        periodId: string | null;
        uploadedById: string | null;
        uploadedAt: Date;
        objectKey: string;
        filename: string;
        fileExt: string | null;
        sizeBytes: number | null;
        quantidade: import("@prisma/client/runtime/library").Decimal | null;
        dataComprovante: Date | null;
        assinaturaOk: boolean | null;
        status: import(".prisma/client").$Enums.ReceiptStatus;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
