export interface StoragePort {
  uploadArquivo(nomeArquivo: string, buffer: Buffer, mimetype: string): Promise<string>;
}

export const STORAGE_PORT = Symbol('STORAGE_PORT');