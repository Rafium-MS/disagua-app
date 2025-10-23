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
exports.PartnerStoresService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PartnerStoresService = class PartnerStoresService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async connect(orgId, partnerId, storeId) {
        try {
            return await this.prisma.partnerStore.create({
                data: { orgId, partnerId, storeId }
            });
        }
        catch (e) {
            if (e.code === 'P2002')
                throw new common_1.ConflictException('Loja já vinculada a outro parceiro');
            throw e;
        }
    }
    list(orgId, query) {
        const { estado, cidade } = query;
        return this.prisma.partnerStore.findMany({
            where: {
                orgId,
                partner: { estado: estado || undefined, cidade: cidade || undefined }
            },
            include: { partner: true, store: { include: { brand: true } } }
        });
    }
    disconnect(orgId, id) {
        return this.prisma.partnerStore.delete({ where: { id } });
    }
};
exports.PartnerStoresService = PartnerStoresService;
exports.PartnerStoresService = PartnerStoresService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartnerStoresService);
//# sourceMappingURL=partner-stores.service.js.map