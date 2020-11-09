import PedidosService from 'App/Services/PedidosService';
import { schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BaseController from './BaseController';
import { PedidoSituacao } from 'App/Enums/PedidoSituacaoEnum';

export default class PedidoController extends BaseController {
  async getAll() {
    return PedidosService.getAll();
  }

  async get({ params }) {
    return PedidosService.getById(params.id);
  }

  async post({ request, response }: HttpContextContract) {
    let ultimoId = 0;
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

    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      console.log(error.messages);
      return response.status(422).send(error.messages);
    }

    for (let item of request.post().itens) {
      if (item.id == ultimoId) {
        return this.unprocessableEntityResponse(response, 'Existem itens duplicados nesse pedido.');
      }

      ultimoId = item.id;
    }

    if (request.post().itens.length == 0) {
      return this.unprocessableEntityResponse(response, 'O pedido deve possuir itens');
    }

    const pedido = await PedidosService.create(request.post());

    if (!pedido) {
      return this.unprocessableEntityResponse(response, 'Exitem itens não encontrados.');
    }

    return pedido;
  }

  async put({ response, request }: HttpContextContract) {
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
    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      return this.unprocessableEntityResponse(response, 'A requisição não é válida', error.message);
    }

    if (request.post().itens.length == 0) {
      return this.unprocessableEntityResponse(response, 'O pedido deve possuir itens');
    }

    let pedido = await PedidosService.getById(request.params().id);

    if (!pedido) {
      return this.notFoundResponse(response, 'Esse pedido não existe.');
    }
    pedido = await PedidosService.update(request.params().id, request.post());

    if (request.post().id != request.params().id) {
      return this.badRequestResponse(
        response,
        'O ID da URL é diferente do ID do corpo da requisição.'
      );
    }

    if (!pedido) {
      return this.unprocessableEntityResponse(response, 'Exitem itens não encontrados.');
    }

    return pedido;
  }

  async patch({ params, request, response }) {
    const postSchema = schema.create({
      id: schema.number(),
      situacao: schema.number(),
    });
    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      return this.unprocessableEntityResponse(response, 'A requisição não é válida', error.message);
    }

    if (!Object.values(PedidoSituacao).includes(request.post().situacao)) {
      return this.unprocessableEntityResponse(response, 'A situação informada não existe.');
    }

    if (request.post().id != request.params().id) {
      return this.badRequestResponse(
        response,
        'O ID da URL é diferente do ID do corpo da requisição.'
      );
    }
    let pedido = await PedidosService.getById(params.id);

    if (!pedido) {
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
