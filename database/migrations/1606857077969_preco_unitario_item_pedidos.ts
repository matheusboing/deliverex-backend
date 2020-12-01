import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PrecoUnitarioItemPedidos extends BaseSchema {
  protected tableName = 'itens_pedidos'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.double("preco_unitario").notNullable()
    } )
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("preco_unitario")
    })
  }
}
