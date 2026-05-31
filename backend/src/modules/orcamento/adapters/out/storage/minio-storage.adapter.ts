import { Injectable, Logger } from '@nestjs/common';
import { Client } from 'minio';
import * as crypto from 'crypto';
import { StoragePort } from '../../../core/ports/out/storage.port';

@Injectable()
export class MinioStorageAdapter implements StoragePort {
  private minioClient: Client;
  private bucketName = 'receitas';
  private readonly logger = new Logger(MinioStorageAdapter.name);

  constructor() {
    this.minioClient = new Client({
      // Lê o nome do serviço do docker-compose ("minio") em vez de localhost
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: parseInt(process.env.MINIO_PORT || '9000', 10),
      useSSL: false,
      accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
      secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin',
    });

    this.inicializarBucket();
  }

  private async inicializarBucket() {
    try {
      const existe = await this.minioClient.bucketExists(this.bucketName);
      if (!existe) {
        await this.minioClient.makeBucket(this.bucketName, 'us-east-1');
        this.logger.log(`Bucket '${this.bucketName}' criado com sucesso no MinIO.`);
      }
    } catch (error) {
      this.logger.error(`Erro ao verificar/criar o bucket '${this.bucketName}'`, error);
    }
  }

  async uploadArquivo(nomeArquivo: string, buffer: Buffer, mimetype: string): Promise<string> {
    // Adiciona um hash no nome do arquivo para evitar substituir arquivos com o mesmo nome
    const hash = crypto.randomBytes(8).toString('hex');
    const nomeUnico = `${hash}-${nomeArquivo.replace(/\s+/g, '_')}`;

    try {
      // Faz o upload real do buffer para o MinIO
      await this.minioClient.putObject(
        this.bucketName,
        nomeUnico,
        buffer,
        buffer.length,
        { 'Content-Type': mimetype }
      );

      this.logger.log(`Upload concluído: ${nomeUnico}`);

      // Retorna a URL de acesso público (ajustada para o ambiente local)
      return `http://localhost:9000/${this.bucketName}/${nomeUnico}`;
    } catch (error) {
      this.logger.error(`Erro ao fazer upload do arquivo ${nomeUnico}`, error);
      throw new Error('Falha na comunicação com o servidor de armazenamento.');
    }
  }
}