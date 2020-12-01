import ItemDto from 'App/Dtos/ItemDto';
import PedidoDto from 'App/Dtos/PedidoDto';
import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';
import Item from 'App/Models/Item';
import Pedido from 'App/Models/Pedido';

class PedidosService {
  /**
   * Retorna todos os pedidos do banco
   */
  public async obterTodos(carregarItens: string) {
    if (carregarItens && carregarItens === 'true') {
      const pedidos = await Pedido.query().preload('itens');
      const pedidosDto: PedidoDto[] = [];

      for(let pedido of pedidos) {
        const pedidoDto: PedidoDto = new PedidoDto({
          id: pedido.id,
          descricao: pedido.descricao,
          situacao: pedido.situacao,
          criadoEm: pedido.criadoEm.toJSDate(),
          atualizadoEm: pedido.atualizadoEm.toJSDate(),
          valorTotal: 0
        });

        pedidoDto.itens = pedido.itens.map((item) => {
          pedidoDto.valorTotal += item.$extras.pivot_valor_total;
          return new ItemDto({
            id: item.id,
            codigo: item.codigo,
            descricao: item.descricao,
            preco: item.$extras.pivot_preco_unitario,
            criadoEm: item.criadoEm.toJSDate(),
            atualizadoEm: item.atualizadoEm.toJSDate(),
            quantidade: item.$extras.pivot_quantidade,
            desconto: item.$extras.pivot_desconto,
            valorTotal: item.$extras.pivot_valor_total,
          });
        });

        pedidosDto.push(pedidoDto);
      }

      return pedidosDto;
    }

    return await Pedido.all();
  }

  /**
   * Retorna o pedido do ID informado
   * @param id ID do pedido
   * @param carregarItens Indica se deve retornar os itens do pedido
   */
  public async obterPorId(id: number, carregarItens: string): Promise<PedidoDto | null> {
    const pedido = await Pedido.find(id);

    if (!pedido) {
      return null;
    }

    const pedidoDto: PedidoDto = new PedidoDto({
      id: pedido.id,
      descricao: pedido.descricao,
      situacao: pedido.situacao,
      criadoEm: pedido.criadoEm.toJSDate(),
      atualizadoEm: pedido.atualizadoEm.toJSDate(),
      valorTotal: 0
    });

    if (carregarItens && carregarItens === 'true') {
      await pedido.preload('itens');
      pedidoDto.itens = pedido.itens.map((item) => {
        pedidoDto.valorTotal += item.$extras.pivot_valor_total;
        return new ItemDto({
          id: item.id,
          codigo: item.codigo,
          descricao: item.descricao,
          preco: item.$extras.pivot_preco_unitario,
          criadoEm: item.criadoEm.toJSDate(),
          atualizadoEm: item.atualizadoEm.toJSDate(),
          quantidade: item.$extras.pivot_quantidade,
          desconto: item.$extras.pivot_desconto,
          valorTotal: item.$extras.pivot_valor_total,
        });
      });
    }

    return pedidoDto;
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
              preco_unitario: item.preco,
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
    await pedido.preload("itens");

    const itensExistentes = pedido.itens.map(item => {
      return {codigo: item.codigo, preco: item.$extras.pivot_preco_unitario}
    })

    pedido.related('itens').detach();

    for (let itemPedido of pedidoEditado.itens) {
      const item = await Item.findBy('codigo', itemPedido.codigo);

      if (item) {
        const itemExistente = itensExistentes.find(i => i.codigo == item.codigo);

        if (itemExistente) {
          item.preco = itemExistente.preco;
        }

        await pedido.related('itens').attach({
          [item.id]: {
            preco_unitario: item.preco, 
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
