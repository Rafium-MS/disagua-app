import { FilesService } from './files.service';
import { PresignDto } from './dto';
export declare class FilesController {
    private files;
    constructor(files: FilesService);
    presign(req: any, dto: PresignDto): Promise<{
        url: string;
        key: string;
        publicUrl: string;
    }>;
}
