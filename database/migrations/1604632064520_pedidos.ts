import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';

export default class Pedidos extends BaseSchema {
  protected tableName = 'pedidos';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.string('descricao').notNullable();
      table.enum('situacao', Object.values(PedidoSituacao)).notNullable();
      table.dateTime('criado_em').notNullable();
      table.dateTime('atualizado_em').notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
