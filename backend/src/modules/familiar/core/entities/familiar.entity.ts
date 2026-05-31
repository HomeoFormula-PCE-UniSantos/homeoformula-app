export class Familiar {
  constructor(
    public id: string,
    public clienteId: string,
    public nome: string,
    public parentesco: string,
    public dataNascimento?: string,
  ) {}
}