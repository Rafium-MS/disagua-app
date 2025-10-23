import { AuthService } from './auth.service';
import { LoginDto } from './dto';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    login(dto: LoginDto): Promise<{
        access: string;
        refresh: string;
        user: {
            id: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            orgId: string;
        };
    }>;
}
