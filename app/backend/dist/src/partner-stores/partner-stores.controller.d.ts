import { PartnerStoresService } from './partner-stores.service';
export declare class PartnerStoresController {
    private service;
    constructor(service: PartnerStoresService);
    list(req: any, query: any): any;
    connect(req: any, partnerId: string, storeId: string): Promise<any>;
    disconnect(req: any, id: string): any;
}
