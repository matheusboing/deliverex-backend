export default class ItemDto {
    public id: number;
    public codigo: number;
    public descricao: string;
    public preco: number;
    public quantidade: number;
    public desconto: number;
    public valorTotal: number;
    public criadoEm: Date;
    public atualizadoEm: Date;

    constructor(item: Partial<ItemDto>) {
        Object.assign(this, item);
    }
}