import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private s3: AWS.S3;
  private bucket: string;
  private readonly publicBase: string;
  constructor(private config: ConfigService){
    this.s3 = new AWS.S3({
      endpoint: this.config.get('S3_ENDPOINT'),
      region: this.config.get('S3_REGION') || 'us-east-1',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
      credentials: { accessKeyId: this.config.get('S3_ACCESS_KEY') || '', secretAccessKey: this.config.get('S3_SECRET_KEY') || '' }
    });
    this.bucket = this.config.get('S3_BUCKET') || 'disagua';
    const publicBase = this.config.get('S3_PUBLIC_URL') || this.config.get('S3_ENDPOINT') || '';
    this.publicBase = publicBase.replace(/\/$/, '');
  }
  safe(s?: string){
    return (s || '').normalize('NFKD').replace(/[^\w.-]+/g, '-');
  }
  private segment(value: string | undefined | null, fallback: string){
    const cleaned = this.safe(value || '');
    return cleaned || fallback;
  }
  buildObjectKey(orgId:string, y:string, m:string, uf?:string, municipio?:string, partnerId?:string, storeId?:string, filename?:string){
    const ym = `${y}-${m.padStart(2,'0')}`;
    const ts = new Date().toISOString().replace(/[:.]/g,'').replace('T','_').slice(0,15);
    const name = this.safe(filename) || `${uuidv4()}`;
    const parts = [
      this.segment(orgId, 'org'),
      ym,
      this.segment(uf, 'sem-uf'),
      this.segment(municipio, 'sem-municipio'),
      this.segment(partnerId, 'partner'),
      this.segment(storeId, 'store'),
      `${ts}-${name}`,
    ];
    return parts.join('/');
  }
  async presignPut(params: { orgId:string, key:string, contentType:string, expires?: number }){
    const url = await this.s3.getSignedUrlPromise('putObject', { Bucket: this.bucket, Key: params.key, ContentType: params.contentType, Expires: params.expires ?? 900 });
    const base = this.publicBase;
    const publicUrl = base ? `${base}/${this.bucket}/${params.key}` : `${this.bucket}/${params.key}`;
    return { url, key: params.key, publicUrl };
  }
}
