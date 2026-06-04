export class Familiar {
  constructor(
    public id: string,
    public usuarioId: string,
    public nome: string,
    public parentesco: string,
    public dataNascimento?: string,
  ) {}
}
