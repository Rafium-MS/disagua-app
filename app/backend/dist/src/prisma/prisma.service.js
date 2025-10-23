"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = PrismaService_1 = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(PrismaService_1.name);
        this.maxRetries = (() => {
            var _a;
            const raw = Number((_a = process.env.PRISMA_CONNECTION_RETRIES) !== null && _a !== void 0 ? _a : 5);
            if (!Number.isFinite(raw)) {
                return 5;
            }
            if (raw <= 0) {
                return null;
            }
            return Math.floor(raw);
        })();
        this.retryDelayMs = (() => {
            var _a;
            const raw = Number((_a = process.env.PRISMA_RETRY_DELAY_MS) !== null && _a !== void 0 ? _a : 2000);
            return Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : 2000;
        })();
    }
    onModuleInit() {
        this.tryConnectWithRetry();
    }
    tryConnectWithRetry(attempt = 1) {
        this.$connect()
            .then(() => {
            this.logger.log('Database connection established.');
        })
            .catch((error) => {
            var _a;
            const reachedMaxRetries = this.maxRetries !== null && attempt >= this.maxRetries;
            const reason = error instanceof Error ? error.message : String(error);
            if (reachedMaxRetries) {
                this.logger.error(`Failed to connect to the database after ${attempt} attempt(s). Keeping the API running and retrying in ${this.retryDelayMs}ms. Reason: ${reason}`, error instanceof Error ? error.stack : String(error));
            }
            else {
                this.logger.warn(`Database connection failed (attempt ${attempt}/${(_a = this.maxRetries) !== null && _a !== void 0 ? _a : '∞'}). Retrying in ${this.retryDelayMs}ms... Reason: ${reason}`);
            }
            const nextAttempt = reachedMaxRetries && this.maxRetries !== null ? 1 : attempt + 1;
            setTimeout(() => this.tryConnectWithRetry(nextAttempt), this.retryDelayMs);
        });
    }
    async enableShutdownHooks(app) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = PrismaService_1 = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map