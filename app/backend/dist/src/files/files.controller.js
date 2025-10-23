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
exports.FilesController = void 0;
const common_1 = require("@nestjs/common");
const files_service_1 = require("./files.service");
const jwt_guard_1 = require("../common/jwt.guard");
const dto_1 = require("./dto");
let FilesController = class FilesController {
    constructor(files) {
        this.files = files;
    }
    async presign(req, dto) {
        const now = new Date();
        const y = dto.y || String(now.getUTCFullYear());
        const m = dto.m || String(now.getUTCMonth() + 1);
        const key = this.files.buildObjectKey(req.user.orgId, y, m, dto.uf, dto.municipio, dto.partnerId, dto.storeId, dto.filename);
        return this.files.presignPut({ orgId: req.user.orgId, key, contentType: dto.contentType });
    }
};
exports.FilesController = FilesController;
__decorate([
    (0, common_1.Post)('presign'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.PresignDto]),
    __metadata("design:returntype", Promise)
], FilesController.prototype, "presign", null);
exports.FilesController = FilesController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [files_service_1.FilesService])
], FilesController);
//# sourceMappingURL=files.controller.js.map