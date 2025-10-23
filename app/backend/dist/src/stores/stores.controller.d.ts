import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto';
export declare class StoresController {
    private service;
    constructor(service: StoresService);
    list(req: any, query: any): any;
    create(req: any, dto: CreateStoreDto): any;
}
