import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm';
import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';
import { DateTime } from 'luxon';
import Item from './Item';

export default class Pedido extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public descricao: string;

  @column()
  public situacao: PedidoSituacao;

  @column.dateTime({ autoCreate: true })
  public criadoEm: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public atualizadoEm: DateTime;

  @manyToMany(() => Item, {
    localKey: 'id',
    pivotForeignKey: 'pedido_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'item_id',
    pivotTable: 'itens_pedidos',
    pivotColumns: ['quantidade', 'desconto', 'valor_total'],
  })
  public itens: ManyToMany<typeof Item>;
}
