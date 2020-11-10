import PedidosService from 'App/Services/PedidosService';
import { schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseController from './BaseController';
import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';

export default class PedidoController extends BaseController {
  async getAll({request}) {
    return await PedidosService.obterTodos(request.requestData.carregarItens);
  }

  async get({ params, response, request }) {
    const pedido = await PedidosService.obterPorId(params.id, request.requestData.carregarItens);

    if (!pedido) {
      return this.notFound(response, 'Esse pedido não existe.');

    return pedido;
  }
  async post({ request, response }: HttpContextContract) {
          codigo: schema.number(),
    const postSchema = schema.create({
      itens: schema.array().members(
        schema.object().members({
          id: schema.number(),
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
    let ultimoCodigo = 0;

    } catch (error) {
      if (item.codigo == ultimoCodigo) {
        return this.unprocessableEntity(response, 'Existem itens duplicados nesse pedido.');
    }

      ultimoCodigo = item.codigo;
      if (item.id == ultimoId) {
        return this.unprocessableEntityResponse(response, 'Existem itens duplicados nesse pedido.');
      }
      return this.unprocessableEntity(response, 'O pedido deve possuir itens');
      ultimoId = item.id;
    }
    const pedido = await PedidosService.criar(request.post());
    if (request.post().itens.length == 0) {
      return this.unprocessableEntityResponse(response, 'O pedido deve possuir itens');
      return this.unprocessableEntity(response, 'Exitem itens não encontrados.');

    const pedido = await PedidosService.create(request.post());

    if (!pedido) {
      return this.unprocessableEntityResponse(response, 'Exitem itens não encontrados.');
  async put({ response, request }) {

    return pedido;
  }

          codigo: schema.number(),
    const postSchema = schema.create({
      descricao: schema.string(),
      itens: schema.array().members(
        schema.object().members({
          id: schema.number(),
          quantidade: schema.number(),

          preco: schema.number(),
          desconto: schema.number(),
        })
      ),
    });
      return this.unprocessableEntity(response, 'A requisição não é válida', error.messages);
      await request.validate({
        schema: postSchema,
      });
      return this.unprocessableEntity(response, 'O pedido deve possuir itens');
    }

    let ultimoCodigo = 0;

    for (let item of request.post().itens) {
      if (item.codigo == ultimoCodigo) {
        return this.unprocessableEntity(response, 'Existem itens duplicados nesse pedido.');
      }

      ultimoCodigo = item.codigo;
      return this.unprocessableEntityResponse(response, 'A requisição não é válida', error.message);
    }
    let pedido = await PedidosService.obterPorId(request.params().id, request.requestData.carregarItens);
    if (request.post().itens.length == 0) {
      return this.unprocessableEntityResponse(response, 'O pedido deve possuir itens');
      return this.notFound(response, 'Esse pedido não existe.');

    pedido = await PedidosService.atualizar(request.params().id, request.post());

    if (!pedido) {
      return this.badRequest(
    }
    pedido = await PedidosService.update(request.params().id, request.post());

    if (request.post().id != request.params().id) {
      return this.badRequestResponse(
        response,
      return this.unprocessableEntity(response, 'Exitem itens não encontrados.');
      );
    }

    if (!pedido) {
      return this.unprocessableEntity(response, 'A requisição não é válida', error.message);
    }

    return pedido;
      return this.unprocessableEntity(response, 'A situação informada não existe.');

  async patch({ params, request, response }) {
    const postSchema = schema.create({
      return this.badRequest(
      situacao: schema.number(),
    });
    try {
      await request.validate({
    let pedido = await PedidosService.obterPorId(params.id, request.requestData.carregarItens);
      });
    } catch (error) {
      return this.notFound(response, 'Esse pedido não existe.');
    }

    return await PedidosService.atualizarSituacao(request.post().id, request.post().situacao);
      return this.unprocessableEntityResponse(response, 'A situação informada não existe.');
    }
  async delete({ params, response, request }) {
    const pedido = await PedidosService.obterPorId(params.id, request.requestData.carregarItens);
      return this.badRequestResponse(
        response,
      return this.notFound(response, 'Esse pedido não existe.');
      );
    }
    await PedidosService.deletar(pedido.id);

    return this.noContent(response);
      return this.notFoundResponse(response, 'Esse pedido não existe.');
    }

    return await PedidosService.updateStatus(request.post().id, request.post().situacao);
  }

  async delete({ params, response }) {
    const pedido = await PedidosService.getById(params.id);

    if (!pedido) {
      return this.notFoundResponse(response, 'Esse pedido não existe.');
    }

    await PedidosService.delete(pedido.id);

    return this.noContentResponse(response);
  }
}
