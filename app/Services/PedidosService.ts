import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';
import Item from 'App/Models/Item';
import Pedido from 'App/Models/Pedido';

class PedidosService {
    /**
   * Retorna todos os pedidos do banco
   */
  public async obterTodos(carregarItens: string) {
    if (carregarItens && carregarItens === 'true') {
      return await Pedido.query().preload('itens');
    }

    return await Pedido.all();
  }

    /**
   * Retorna o pedido do ID informado
   * @param id ID do pedido 
   * @param carregarItens Indica se deve retornar os itens do pedido
   */
  public async obterPorId(id: number, carregarItens: string): Promise<Pedido | null> {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }
    if (carregarItens && carregarItens === 'true') {
      await pedido.preload('itens');
    }

    return pedido;
  }

   /**
   * Cria um pedido
   * @param novoPedido pedido a ser criado
   * @return null, caso um item do pedido não exista
   */
  public async criar(novoPedido) {
    for (let itemPedido of novoPedido.itens) {
      const item = await Item.findBy('codigo', itemPedido.codigo);

      if (!item) {
        return null;
      }
    }

    const pedido = new Pedido();
    pedido.descricao = novoPedido.descricao;
    pedido.situacao = PedidoSituacao.EmAnalise;
    await pedido.save();

    try {
      pedido.related('itens').detach();

      for (let itemPedido of novoPedido.itens) {
        const item = await Item.findBy('codigo', itemPedido.codigo);

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
    } catch (error) {
      await pedido.related('itens').detach();
      await pedido.delete();
      throw error;
    }

    return pedido;
  }

  /**
   * Atualiza um pedido
   * @returns null, caso o pedido não exista
   */
  public async atualizar(id: number, pedidoEditado) {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }

    for (let itemPedido of pedidoEditado.itens) {
      const item = await Item.findBy('codigo', itemPedido.codigo);

      if (!item) {
        return null;
      }
    }

    pedido.descricao = pedidoEditado.descricao;
    await pedido.save();

    pedido.related('itens').detach();

    for (let itemPedido of pedidoEditado.itens) {
      const item = await Item.findBy('codigo', itemPedido.codigo);

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

    return pedido;
  }

  /**
   * Atualiza a situação do pedido
   * @param id ID do pedido 
   * @param situacao Situação do pedido
   * @returns o pedido atualizado
   */
  public async atualizarSituacao(id: number, situacao: PedidoSituacao) {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }

    pedido.situacao = situacao;
    await pedido.save();
    return pedido;
  }

  /**
   * Deleta um pedido 
   * @param id ID do pedido
   * @returns null, caso o pedido não exista
   */
  public async deletar(id: number) {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }

    await pedido.related('itens').detach();
    return await pedido.delete();
  }
}

export default new PedidosService();
