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
        const period = await this.prisma.reportPeriod.findUnique({ where: { orgId_y_m: { orgId, y, m } } });
        const receiptsByStatus = await this.prisma.receipt.groupBy({ by: ['status'], where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined }, _count: { _all: true } });
        const entriesByBrand = await this.prisma.reportEntry.groupBy({ by: ['brandId'], where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined }, _sum: { total: true } });
        const brands = await this.prisma.brand.findMany({ where: { orgId } });
        const entriesByBrandNamed = entriesByBrand.map(e => { var _a; return ({ brandId: e.brandId, brand: ((_a = brands.find(b => b.id === e.brandId)) === null || _a === void 0 ? void 0 : _a.name) || e.brandId, total: String(e._sum.total || 0) }); });
        const partnersWithReceipts = await this.prisma.receipt.findMany({ where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined, status: 'valido' }, select: { partnerId: true }, distinct: ['partnerId'] });
        const totalPartners = await this.prisma.partner.count({ where: { orgId } });
        const sent = partnersWithReceipts.filter(p => !!p.partnerId).length;
        const coverage = { partnersTotal: totalPartners, partnersSent: sent, partnersPending: totalPartners - sent };
        const byUF = await this.prisma.reportEntry.findMany({ where: { orgId, periodId: (period === null || period === void 0 ? void 0 : period.id) || undefined }, include: { store: true } });
        const ufAgg = {};
        byUF.forEach(e => { var _a; const uf = ((_a = e.store) === null || _a === void 0 ? void 0 : _a.uf) || 'NA'; ufAgg[uf] = (ufAgg[uf] || 0) + Number(e.total || 0); });
        const entriesByUF = Object.entries(ufAgg).map(([uf, total]) => ({ uf, total: String(total) }));
        return { period: { y, m, periodId: (period === null || period === void 0 ? void 0 : period.id) || null }, receiptsByStatus, entriesByBrand: entriesByBrandNamed, entriesByUF, coverage };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map