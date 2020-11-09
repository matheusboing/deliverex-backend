import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';
import Item from 'App/Models/Item';
import Pedido from 'App/Models/Pedido';

class PedidosService {
  public async getAll() {
    return await Pedido.all();
  }

  public async getById(id: number): Promise<Pedido | null> {
    return await Pedido.find(id);
  }

  public async create(pedidoDto) {
    for (let itemDto of pedidoDto.itens) {
      const item = await Item.find(itemDto.id);

      if (!item) {
        return null;
      }
    }
    const pedido = new Pedido();
    pedido.descricao = pedidoDto.descricao;
    pedido.situacao = PedidoSituacao.EmAnalise;
    await pedido.save();
    try {
      pedido.related('itens').detach();

      for (let itemDto of pedidoDto.itens) {
        const item = await Item.find(itemDto.id);

        if (item) {
          await pedido.related('itens').attach({
            [itemDto.id]: {
              quantidade: itemDto.quantidade,
              desconto: itemDto.desconto,
              valor_total: item.preco * itemDto.quantidade - itemDto.desconto,
            },
          });
        } else {
          await pedido.related('itens').detach();
          await pedido.delete();
          return null;
        }
      }
    } catch (error) {
      await pedido.delete();
      throw error;
    }

    return pedido;
  }

  public async update(id, pedidoDto) {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }

    for (let itemDto of pedidoDto.itens) {
      const item = await Item.find(itemDto.id);

      if (!item) {
        return null;
      }
    }

    pedido.descricao = pedidoDto.descricao;
    await pedido.save();

    try {
      pedido.related('itens').detach();

      for (let itemDto of pedidoDto.itens) {
        const item = await Item.find(itemDto.id);

        if (item) {
          await pedido.related('itens').attach({
            [itemDto.id]: {
              quantidade: itemDto.quantidade,
              desconto: itemDto.desconto,
              valor_total: item.preco * itemDto.quantidade - itemDto.desconto,
            },
          });
        }
      }
    } catch (error) {
      throw error;
    }

    return pedido;
  }
  public async updateStatus(id, status) {
    const pedido = await Pedido.find(id);
    if (!pedido) {
      return null;
    }

    pedido.situacao = status;
    await pedido.save();
    return pedido;
  }

  public async delete(id) {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }

    await pedido.related('itens').detach();

    return await pedido.delete();
  }
}
export default new PedidosService();
