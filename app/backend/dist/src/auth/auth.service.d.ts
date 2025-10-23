import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    validateUser(orgId: string, email: string, password: string): Promise<any>;
    login(orgId: string, email: string, password: string): Promise<{
        access: string;
        refresh: string;
        user: {
            id: any;
            email: any;
            role: any;
            orgId: any;
        };
    }>;
}
