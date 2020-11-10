import Item from 'App/Models/Item';

class ItensService {
  public async obterTodos() {
    return await Item.all();
  }

  public async obterPeloId(id: string) {
    return await Item.find(id);
  }

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

  public async deletar(id) {
    const item = await Item.find(id);

    if (!item) {
      return null;
    }

    await item.delete();
  }
}

export default new ItensService();
