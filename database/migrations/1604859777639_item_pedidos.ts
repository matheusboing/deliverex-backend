import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ItemPedidos extends BaseSchema {
  protected tableName = 'itens_pedidos';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('item_id').unsigned().notNullable();
      table.integer('pedido_id').unsigned().notNullable();
      table.double('desconto');
      table.double('quantidade');
      table.double('valor_total');
      table.foreign('item_id').references('itens.id');
      table.foreign('pedido_id').references('pedidos.id');
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
