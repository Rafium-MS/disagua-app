import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private s3: AWS.S3;
  private bucket: string;
  constructor(private config: ConfigService){
    this.s3 = new AWS.S3({
      endpoint: this.config.get('S3_ENDPOINT'),
      region: this.config.get('S3_REGION') || 'us-east-1',
      s3ForcePathStyle: true,
      signatureVersion: 'v4',
      credentials: { accessKeyId: this.config.get('S3_ACCESS_KEY') || '', secretAccessKey: this.config.get('S3_SECRET_KEY') || '' }
    });
    this.bucket = this.config.get('S3_BUCKET') || 'disagua';
  }
  safe(s?: string){ return (s || '').normalize('NFKD').replace(/[^\w.-]+/g, '-'); }
  buildObjectKey(orgId:string, y:string, m:string, uf?:string, municipio?:string, partnerId?:string, storeId?:string, filename?:string){
    const ym = `${y}-${m.padStart(2,'0')}`;
    const ts = new Date().toISOString().replace(/[:.]/g,'').replace('T','_').slice(0,15);
    const name = filename ? this.safe(filename) : `${uuidv4()}`;
    const parts = [orgId, ym, this.safe(uf), this.safe(municipio), partnerId || 'partner', storeId || 'store', `${ts}-${name}`].filter(Boolean);
    return parts.join('/');
  }
  async presignPut(params: { orgId:string, key:string, contentType:string, expires?: number }){
    const url = await this.s3.getSignedUrlPromise('putObject', { Bucket: this.bucket, Key: params.key, ContentType: params.contentType, Expires: params.expires ?? 900 });
    const publicUrl = `${this.config.get('S3_ENDPOINT')}/${this.bucket}/${params.key}`;
    return { url, key: params.key, publicUrl };
  }
}
