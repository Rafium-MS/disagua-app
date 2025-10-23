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
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    constructor(config) {
        this.config = config;
        this.s3 = new AWS.S3({
            endpoint: this.config.get('S3_ENDPOINT'),
            region: this.config.get('S3_REGION') || 'us-east-1',
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
            credentials: { accessKeyId: this.config.get('S3_ACCESS_KEY') || '', secretAccessKey: this.config.get('S3_SECRET_KEY') || '' }
        });
        this.bucket = this.config.get('S3_BUCKET') || 'disagua';
    }
    safe(s) { return (s || '').normalize('NFKD').replace(/[^\w.-]+/g, '-'); }
    buildObjectKey(orgId, y, m, uf, municipio, partnerId, storeId, filename) {
        const ym = `${y}-${m.padStart(2, '0')}`;
        const ts = new Date().toISOString().replace(/[:.]/g, '').replace('T', '_').slice(0, 15);
        const name = filename ? this.safe(filename) : `${(0, uuid_1.v4)()}`;
        const parts = [orgId, ym, this.safe(uf), this.safe(municipio), partnerId || 'partner', storeId || 'store', `${ts}-${name}`].filter(Boolean);
        return parts.join('/');
    }
    async presignPut(params) {
        var _a;
        const url = await this.s3.getSignedUrlPromise('putObject', { Bucket: this.bucket, Key: params.key, ContentType: params.contentType, Expires: (_a = params.expires) !== null && _a !== void 0 ? _a : 900 });
        const publicUrl = `${this.config.get('S3_ENDPOINT')}/${this.bucket}/${params.key}`;
        return { url, key: params.key, publicUrl };
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FilesService);
//# sourceMappingURL=files.service.js.map