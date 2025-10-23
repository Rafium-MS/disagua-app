import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto';
export declare class BrandsController {
    private service;
    constructor(service: BrandsService);
    list(req: any): any;
    create(req: any, dto: CreateBrandDto): any;
}
