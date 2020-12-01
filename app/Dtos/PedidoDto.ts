import { PedidoSituacao } from "App/Enums/PedidoSituacaoEnum";
import ItemDto from "./ItemDto";

export default class PedidoDto {
    public id: number;
    public descricao: string;
    public situacao: PedidoSituacao;
    public criadoEm: Date;
    public atualizadoEm: Date;
    public itens: ItemDto[]
    public valorTotal: number;

    constructor(pedido: Partial<PedidoDto>) {
        Object.assign(this, pedido);
    }
}