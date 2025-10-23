import { ConfigService } from '@nestjs/config';
export declare class FilesService {
    private config;
    private s3;
    private bucket;
    constructor(config: ConfigService);
    safe(s?: string): string;
    buildObjectKey(orgId: string, y: string, m: string, uf?: string, municipio?: string, partnerId?: string, storeId?: string, filename?: string): string;
    presignPut(params: {
        orgId: string;
        key: string;
        contentType: string;
        expires?: number;
    }): Promise<{
        url: string;
        key: string;
        publicUrl: string;
    }>;
}
