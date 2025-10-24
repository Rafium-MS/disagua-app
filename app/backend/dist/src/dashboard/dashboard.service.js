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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async get(orgId, y, m) {
        const period = await this.prisma.reportPeriod.findUnique({
            where: { orgId_y_m: { orgId, y, m } }
        });
        const receiptsGrouped = await this.prisma.receipt.groupBy({
            by: ['status'],
            where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined },
            _count: { _all: true }
        });
        const receiptsByStatus = ['pendente', 'valido', 'invalido'].map((status) => {
            var _a;
            const match = receiptsGrouped.find((item) => item.status === status);
            return { status, count: (_a = match === null || match === void 0 ? void 0 : match._count._all) !== null && _a !== void 0 ? _a : 0 };
        });
        const entriesByBrandRaw = await this.prisma.reportEntry.groupBy({
            by: ['brandId'],
            where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined },
            _sum: { total: true }
        });
        const brands = await this.prisma.brand.findMany({ where: { orgId } });
        const entriesByBrand = entriesByBrandRaw
            .map((entry) => {
            var _a;
            return ({
                brandId: entry.brandId,
                brand: ((_a = brands.find((b) => b.id === entry.brandId)) === null || _a === void 0 ? void 0 : _a.name) || entry.brandId,
                total: Number(entry._sum.total || 0),
            });
        })
            .sort((a, b) => b.total - a.total);
        const partnersWithReceipts = await this.prisma.receipt.findMany({
            where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined, status: 'valido' },
            select: { partnerId: true },
            distinct: ['partnerId']
        });
        const partners = await this.prisma.partner.findMany({
            where: { orgId },
            select: { id: true, parceiro: true }
        });
        const sentIds = new Set(partnersWithReceipts.map((p) => p.partnerId).filter(Boolean));
        const pendingPartners = partners
            .filter((partner) => !sentIds.has(partner.id))
            .map((partner) => ({ id: partner.id, name: partner.parceiro }));
        const coverage = {
            partnersTotal: partners.length,
            partnersSent: partners.length - pendingPartners.length,
            partnersPending: pendingPartners.length,
            pendingPartners,
        };
        const entriesByStore = await this.prisma.reportEntry.findMany({
            where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined },
            include: { store: true }
        });
        const ufAgg = {};
        entriesByStore.forEach((entry) => {
            var _a, _b;
            const uf = ((_b = (_a = entry.store) === null || _a === void 0 ? void 0 : _a.uf) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || 'NA';
            const total = Number(entry.total || 0);
            ufAgg[uf] = (ufAgg[uf] || 0) + total;
        });
        const entriesByUF = Object.entries(ufAgg)
            .map(([uf, total]) => ({ uf, total: Number(total) }))
            .sort((a, b) => b.total - a.total);
        return {
            period: { y, m, periodId: (period === null || period === void 0 ? void 0 : period.id) || null },
            receiptsByStatus,
            entriesByBrand,
            entriesByUF,
            coverage,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map