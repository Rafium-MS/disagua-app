import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    validateUser(orgId: string, email: string, password: string): Promise<{
        id: string;
        orgId: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        isActive: boolean;
    }>;
    login(orgId: string, email: string, password: string): Promise<{
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
