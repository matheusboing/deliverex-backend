import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Item extends BaseModel {
  public static table = 'itens';
  @column({ isPrimary: true })
  public id: number;

  @column()
  public codigo: number;

  @column()
  public descricao: string;

  @column()
  public preco: number;

  @computed({serializeAs: 'valorTotal'})
  public getValorTotal(item: Item) {
    return item.$extras.pivot_valor_total;
  }

  @column.dateTime({ autoCreate: true })
  public criadoEm: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public atualizadoEm: DateTime;
}
