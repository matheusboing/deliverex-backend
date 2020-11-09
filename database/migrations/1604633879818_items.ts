import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Items extends BaseSchema {
  protected tableName = 'itens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();
      table.integer('codigo').unique().notNullable();
      table.string('descricao').notNullable();
      table.double('preco').notNullable();
      table.dateTime('criado_em').notNullable();
      table.dateTime('atualizado_em').notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
