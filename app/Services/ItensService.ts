import Item from 'App/Models/Item';

class ItensService {
  public async getAll() {
    return await Item.all();
  }

  public async getById(id: string) {
    return await Item.find(id);
  }

  public async create(itemDto) {
    const item = new Item();
    if (await Item.findBy('codigo', itemDto.codigo)) {
      return null;
    }

    item.codigo = itemDto.codigo;
    item.descricao = itemDto.descricao;
    item.preco = itemDto.preco;

    return await item.save();
  }

  public async update(id, itemDto) {
    const item = await Item.find(id);
    if (!item) {
      return null;
    }

    item.codigo = itemDto.codigo;
    item.descricao = itemDto.descricao;
    item.preco = itemDto.preco;

    return await item.save();
  }

  public async delete(id) {
    const item = await Item.find(id);

    if (!item) {
      return null;
    }

    return item.delete();
  }
}

export default new ItensService();
