import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    private readonly maxRetries;
    private readonly retryDelayMs;
    onModuleInit(): Promise<void>;
    private tryConnectWithRetry;
    enableShutdownHooks(app: INestApplication): Promise<void>;
}
