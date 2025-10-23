import { ReceiptsService } from './receipts.service';
export declare class ReceiptsController {
    private service;
    constructor(service: ReceiptsService);
    create(req: any, body: any): import(".prisma/client").Prisma.Prisma__ReceiptClient<{
        id: string;
        orgId: string;
        brandId: string | null;
        partnerId: string | null;
        storeId: string | null;
        periodId: string | null;
        uploadedAt: Date;
        objectKey: string;
        filename: string;
        fileExt: string | null;
        sizeBytes: number | null;
        quantidade: import("@prisma/client/runtime/library").Decimal | null;
        dataComprovante: Date | null;
        assinaturaOk: boolean | null;
        status: import(".prisma/client").$Enums.ReceiptStatus;
        uploadedById: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    list(req: any, query: any): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        orgId: string;
        brandId: string | null;
        partnerId: string | null;
        storeId: string | null;
        periodId: string | null;
        uploadedAt: Date;
        objectKey: string;
        filename: string;
        fileExt: string | null;
        sizeBytes: number | null;
        quantidade: import("@prisma/client/runtime/library").Decimal | null;
        dataComprovante: Date | null;
        assinaturaOk: boolean | null;
        status: import(".prisma/client").$Enums.ReceiptStatus;
        uploadedById: string | null;
    }[]>;
    update(req: any, id: string, body: any): import(".prisma/client").Prisma.Prisma__ReceiptClient<{
        id: string;
        orgId: string;
        brandId: string | null;
        partnerId: string | null;
        storeId: string | null;
        periodId: string | null;
        uploadedAt: Date;
        objectKey: string;
        filename: string;
        fileExt: string | null;
        sizeBytes: number | null;
        quantidade: import("@prisma/client/runtime/library").Decimal | null;
        dataComprovante: Date | null;
        assinaturaOk: boolean | null;
        status: import(".prisma/client").$Enums.ReceiptStatus;
        uploadedById: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
