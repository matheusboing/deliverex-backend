import PedidosService from 'App/Services/PedidosService';
import { schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseController from './BaseController';
import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';

export default class PedidoController extends BaseController {

  /**
   * Retorna todos os pedidos do banco de dados
   * @returns lista de pedidos
   */
  async getAll({request}) {
    return await PedidosService.obterTodos(request.requestData.carregarItens);
  }

  /**
   * Retorna um pedido pelo ID 
   * @returns 404, caso o pedido não exista
   * @returns o pedido requisitado
   */
  async get({ params, response, request }) {
    const pedido = await PedidosService.obterPorId(params.id, request.requestData.carregarItens);

    if (!pedido) {
      return this.notFound(response, 'Esse pedido não existe.');
    }

    return pedido;
  }

  /**
   * Cria um pedido
   * @returns 422, caso a requisição seja inválida, 
   * ou não tenha itens, ou existam itens duplicados
   * ou algum item não tenha sido encontrado 
   * @returns o pedido criado
   */
  async post({ request, response }: HttpContextContract) {
    const postSchema = schema.create({
      descricao: schema.string(),
      itens: schema.array().members(
        schema.object().members({
          codigo: schema.number(),
          quantidade: schema.number(),
          desconto: schema.number(),
        })
      ),
    });

    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      console.log(error.messages);
      return response.status(422).send(error.messages);
    }

    let ultimoCodigo = 0;

    for (let item of request.post().itens) {
      if (item.codigo == ultimoCodigo) {
        return this.unprocessableEntity(response, 'Existem itens duplicados nesse pedido.');
      }

      ultimoCodigo = item.codigo;
    }

    if (request.post().itens.length == 0) {
      return this.unprocessableEntity(response, 'O pedido deve possuir itens');
    }

    const pedido = await PedidosService.criar(request.post());

    if (!pedido) {
      return this.unprocessableEntity(response, 'Exitem itens não encontrados.');
    }

    return pedido;
  }

    /**
   * Edita um pedido
   *@returns 422, caso a requisição seja inválida, 
   * ou não tenha itens, ou existam itens duplicados
   * ou algum item não tenha sido encontrado 
   * @returns 404, caso o pedido não exista
   * @returns 400, caso o ID da URL seja diferente do ID do corpo da requisição
   * @returns 409, caso um pedido com o mesmo código já exista
   * @returns o pedido editado
   */
  async put({ response, request }) {
    const postSchema = schema.create({
      descricao: schema.string(),
      itens: schema.array().members(
        schema.object().members({
          codigo: schema.number(),
          quantidade: schema.number(),
          preco: schema.number(),
          desconto: schema.number(),
        })
      ),
    });

    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      return this.unprocessableEntity(response, 'A requisição não é válida', error.messages);
    }

    if (request.post().itens.length == 0) {
      return this.unprocessableEntity(response, 'O pedido deve possuir itens');
    }

    let ultimoCodigo = 0;

    for (let item of request.post().itens) {
      if (item.codigo == ultimoCodigo) {
        return this.unprocessableEntity(response, 'Existem itens duplicados nesse pedido.');
      }

      ultimoCodigo = item.codigo;
    }

    let pedido = await PedidosService.obterPorId(
      request.params().id,
      request.requestData.carregarItens
    );

    if (!pedido) {
      return this.notFound(response, 'Esse pedido não existe.');
    }
    pedido = await PedidosService.atualizar(request.params().id, request.post());

    if (request.post().id != request.params().id) {
      return this.badRequest(response, 'O ID da URL é diferente do ID do corpo da requisição.');
    }

    if (!pedido) {
      return this.unprocessableEntity(response, 'Exitem itens não encontrados.');
    }

    return pedido;
  }

  /**
   * Altera o situação de um pedido
   * @returns 422, caso a rquisição não for válida, 
   * ou caso situação informada não existe
   * @returns 400, caso o ID da URL for diferente do ID do corpo da requisição
   * @returns 404, caso o pedido não exista
   */
  async patch({ params, request, response }) {
    const postSchema = schema.create({
      id: schema.number(),
      situacao: schema.enum(Object.entries(PedidoSituacao).map(([key, _]) => key)),
    });
    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      return this.unprocessableEntity(response, 'A requisição não é válida', error.message);
    }

    if (!Object.values(PedidoSituacao).includes(request.post().situacao)) {
      return this.unprocessableEntity(response, 'A situação informada não existe.');
    }

    if (request.post().id != request.params().id) {
      return this.badRequest(response, 'O ID da URL é diferente do ID do corpo da requisição.');
    }
    let pedido = await PedidosService.obterPorId(params.id, request.requestData.carregarItens);

    if (!pedido) {
      return this.notFound(response, 'Esse pedido não existe.');
    }

    return await PedidosService.atualizarSituacao(request.post().id, request.post().situacao);
  }

  /**
   * Deleta um pedido
   * @returns 404, caso o pedido não exista
   * @returns 204, caso o pedido seja deletado
   */
  async delete({ params, response, request }) {
    const pedido = await PedidosService.obterPorId(params.id, request.requestData.carregarItens);

    if (!pedido) {
      return this.notFound(response, 'Esse pedido não existe.');
    }

    await PedidosService.deletar(pedido.id);

    return this.noContent(response);
  }
}
