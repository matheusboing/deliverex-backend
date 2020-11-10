import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';
import Item from 'App/Models/Item';
import Pedido from 'App/Models/Pedido';

class PedidosService {
  public async obterTodos(carregarItens: string) {
    if (carregarItens && carregarItens === 'true') {
      return await Pedido.query().preload('itens');
    }
  public async obterPorId(id: number, carregarItens: string): Promise<Pedido | null> {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }
    if (carregarItens && carregarItens === 'true') {
      await pedido.preload('itens');
  public async criar(novoPedido) {
    for (let itemPedido of novoPedido.itens) {
      const item = await Item.findBy('codigo', itemPedido.codigo);

    }

    return pedido;
  }


    pedido.descricao = novoPedido.descricao;
    for (let itemDto of pedidoDto.itens) {
      const item = await Item.find(itemDto.id);


      if (!item) {
        return null;
      for (let itemPedido of novoPedido.itens) {
        const item = await Item.findBy('codigo', itemPedido.codigo);
    const pedido = new Pedido();
    pedido.descricao = pedidoDto.descricao;
    pedido.situacao = PedidoSituacao.EmAnalise;
            [item.id]: {
              quantidade: itemPedido.quantidade,
              desconto: itemPedido.desconto,
              valor_total: item.preco * itemPedido.quantidade - itemPedido.desconto,
      for (let itemDto of pedidoDto.itens) {
        const item = await Item.find(itemDto.id);
              quantidade: itemDto.quantidade,
              desconto: itemDto.desconto,
              valor_total: item.preco * itemDto.quantidade - itemDto.desconto,
      await pedido.related('itens').detach();
            },
          });
        } else {
          await pedido.related('itens').detach();
  public async atualizar(id: number, pedidoEditado) {
          return null;
        }
      }
    } catch (error) {
      await pedido.delete();
      throw error;
    for (let itemPedido of pedidoEditado.itens) {
      const item = await Item.findBy('codigo', itemPedido.codigo);
    return pedido;
  }

  public async update(id, pedidoDto) {
    const pedido = await Pedido.find(id);

    pedido.descricao = pedidoEditado.descricao;
      return null;
    }
    pedido.related('itens').detach();
      const item = await Item.find(itemDto.id);
    for (let itemPedido of pedidoEditado.itens) {
      const item = await Item.findBy('codigo', itemPedido.codigo);
        return null;
      if (item) {
        await pedido.related('itens').attach({
          [item.id]: {
            quantidade: itemPedido.quantidade,
            desconto: itemPedido.desconto,
            valor_total: item.preco * itemPedido.quantidade - itemPedido.desconto,
          },
        });
      }
    }
          await pedido.related('itens').attach({
            [itemDto.id]: {
              quantidade: itemDto.quantidade,
              desconto: itemDto.desconto,
              valor_total: item.preco * itemDto.quantidade - itemDto.desconto,
            },
          });
  public async atualizarSituacao(id: number, situacao: PedidoSituacao) {
      }

    } catch (error) {
      throw error;
    }

    pedido.situacao = situacao;
  }
  public async updateStatus(id, status) {
    const pedido = await Pedido.find(id);
  public async deletar(id: number) {
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
