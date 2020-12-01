import Item from 'App/Models/Item';

class ItensService {

  /**
   * Retorna todos os itens do banco
   */
  public async obterTodos() {
    return await Item.all();
  }

  /**
   * Retorna o item do ID informado
   * @param id ID do item 
   */
  public async obterPeloId(id: string) {
    return await Item.find(id);
  }

  public async obterPeloCodigo(codigo: number) {
    return await Item.findBy("codigo", codigo);
  }

  /**
   * Cria um item
   * @param novoItem item a ser criado
   * @return null, caso um item com o mesmo código já exista 
   */
  public async criar(novoItem) {
    const item = new Item();
    if (await Item.findBy('codigo', novoItem.codigo)) {
      return null;
    }

    item.codigo = novoItem.codigo;
    item.descricao = novoItem.descricao;
    item.preco = novoItem.preco;

    return await item.save();
  }

  /**
   * Atualiza um item
   * @returns null, caso o item não exista
   */
  public async atualizar(id, itemAtualizado) {
    const item = await Item.find(id);
    if (!item) {
      return null;
    }

    item.codigo = itemAtualizado.codigo;
    item.descricao = itemAtualizado.descricao;
    item.preco = itemAtualizado.preco;

    return await item.save();
  }

  /**
   * Deleta um item 
   * @param id ID do item
   * @returns null, caso o item não exista
   */
  public async deletar(id) {
    const item = await Item.find(id);
    const pedido = await (await Pedido.query().preload("itens")).find(p => p.itens.find(i => i.id == id))

    if (!item || pedido) {
      return false;
    }

    await item.delete();
    return true;
  }
}

export default new ItensService();
