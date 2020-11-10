import ItensService from 'App/Services/ItensService';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import BaseController from './BaseController';

export default class ItensController extends BaseController {
  async getAll() {
    return await ItensService.obterTodos();
  }

  async get({ request, response }) {
    const item = await ItensService.obterPeloId(request.params().id);
    if (!item) {
      return this.notFound(response, "Item não encontrado.");
    }

    return item;
  }

  async post({ request, response }: HttpContextContract) {
    const postSchema = schema.create({
      codigo: schema.number(),
      descricao: schema.string(),
      preco: schema.number(),
    });

    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      return this.unprocessableEntity(response, 'A requisição não é válida', error.messages);
    }

    const item = await ItensService.criar(request.post());
    if (!item) {
      return this.conflict(response, 'Este item já existe.');
    }

    return item;
  }

  async put({ response, request }: HttpContextContract) {
    const postSchema = schema.create({
      id: schema.number(),
      codigo: schema.number(),
      descricao: schema.string(),
      preco: schema.number(),
    });

    try {
      await request.validate({
        schema: postSchema,
      });
    } catch (error) {
      return this.unprocessableEntity(response, 'A requisição não é válida', error.message);
    }

    const item = await ItensService.atualizar(request.params().id, request.post());

    if (request.post().id != request.params().id) {
      return this.badRequest(
        response,
        'O ID da URL é diferente do ID do corpo da requisição.'
      );
    }

    if (!item) {
      return this.notFound(response, 'Esse item não existe.');
    }

    return item;
  }

  async delete({ params, response }) {
    const item = await ItensService.obterPeloId(params.id);

    if (!item) {
      return this.notFound(response, 'Esse item não existe.');
    }

    await ItensService.deletar(item.id);
    return this.noContent(response);
  }
}
