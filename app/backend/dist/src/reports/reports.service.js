"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    createPeriod(orgId, y, m) {
        return this.prisma.reportPeriod.upsert({
            where: { orgId_y_m: { orgId, y, m } },
            create: { orgId, y, m },
            update: {}
        });
    }
    async list(orgId, query) {
        const { start, end, brand } = query;
        const entries = await this.prisma.reportEntry.findMany({
            where: {
                orgId,
                brandId: brand || undefined,
                data: {
                    gte: start ? new Date(start) : undefined,
                    lte: end ? new Date(end) : undefined
                }
            },
            include: { brand: true, store: true, period: true }
        });
        const totals = entries.reduce((acc, e) => {
            acc.total = (acc.total || 0) + Number(e.total || 0);
            return acc;
        }, {});
        return { totals, count: entries.length, entries };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map