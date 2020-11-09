import ItensService from 'App/Services/ItensService';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import BaseController from './BaseController';

export default class ItensController extends BaseController {
  async getAll() {
    return await ItensService.getAll();
  }

  async get({ request, response }) {
    const item = await ItensService.getById(request.params().id);
    if (!item) {
      return response.status(404).send('Este item não existe');
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
      return this.unprocessableEntityResponse(response, 'A requisição não é válida', error.message);
    }

    const item = await ItensService.create(request.post());
    if (!item) {
      return this.conflictResponse(response, 'Este item já existe.');
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
      return this.unprocessableEntityResponse(response, 'A requisição não é válida', error.message);
    }

    const item = await ItensService.update(request.params().id, request.post());

    if (request.post().id != request.params().id) {
      return this.badRequestResponse(
        response,
        'O ID da URL é diferente do ID do corpo da requisição.'
      );
    }

    if (!item) {
      return this.conflictResponse(response, 'Esse item já existe.');
    }

    return item;
  }

  async delete({ params, response }) {
    const item = await ItensService.getById(params.id);

    if (!item) {
      return this.notFoundResponse(response, 'Esse item não existe.');
    }

    await ItensService.delete(item.id);
    return this.noContentResponse(response);
  }
}
