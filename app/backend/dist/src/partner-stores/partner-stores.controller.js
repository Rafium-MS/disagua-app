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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerStoresController = void 0;
const common_1 = require("@nestjs/common");
const partner_stores_service_1 = require("./partner-stores.service");
const jwt_guard_1 = require("../common/jwt.guard");
let PartnerStoresController = class PartnerStoresController {
    constructor(service) {
        this.service = service;
    }
    list(req, query) {
        return this.service.list(req.user.orgId, query);
    }
    connect(req, partnerId, storeId) {
        return this.service.connect(req.user.orgId, partnerId, storeId);
    }
    disconnect(req, id) {
        return this.service.disconnect(req.user.orgId, id);
    }
};
exports.PartnerStoresController = PartnerStoresController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PartnerStoresController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':partnerId/:storeId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('partnerId')),
    __param(2, (0, common_1.Param)('storeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], PartnerStoresController.prototype, "connect", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], PartnerStoresController.prototype, "disconnect", null);
exports.PartnerStoresController = PartnerStoresController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('partner-stores'),
    __metadata("design:paramtypes", [partner_stores_service_1.PartnerStoresService])
], PartnerStoresController);
//# sourceMappingURL=partner-stores.controller.js.map