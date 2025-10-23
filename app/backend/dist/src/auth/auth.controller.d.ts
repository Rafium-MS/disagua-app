import { AuthService } from './auth.service';
import { LoginDto } from './dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
        access: any;
        refresh: any;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            orgId: string;
        };
    }>;
}
