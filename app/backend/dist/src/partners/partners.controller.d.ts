import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto';
export declare class PartnersController {
    private service;
    constructor(service: PartnersService);
    list(req: any, query: any): any;
    create(req: any, dto: CreatePartnerDto): any;
}
