import { ReceiptsService } from './receipts.service';
export declare class ReceiptsController {
    private service;
    constructor(service: ReceiptsService);
    create(req: any, body: any): any;
    list(req: any, query: any): any;
    update(req: any, id: string, body: any): any;
}
