import ItensService from 'App/Services/ItensService';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import BaseController from './BaseController';

export default class ItensController extends BaseController {
  /**
   * Retorna todos os itens do banco de dados
   * @returns lista de itens
   */
  async getAll() {
    return await ItensService.obterTodos();
  }

  async getByCodigo({request, response}) {
    const item = await ItensService.obterPeloCodigo(request.params().codigo);
    if(!item) {
      return this.notFound(response, "Item não encontrado.")
    }

    return item;
  }

  /**
   * Retorna um item pelo ID 
   * @returns 404, caso o item não exista
   * @returns o item requisitado
   */
  async get({ request, response }) {
    const item = await ItensService.obterPeloId(request.params().id);
    if (!item) {
      return this.notFound(response, "Item não encontrado.");
    }

    return item;
  }

  /**
   * Cria um item
   * @returns 422, caso a requisição seja inválida
   * @returns 409, caso um item com o mesmo código já exista
   * @returns o item criado
   */
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

  /**
   * Edita um item
   * @returns 422, caso a requisição seja inválida
   * @returns 404, caso o pedido não exista
   * @returns 400, caso o ID da URL seja diferente do ID do corpo da requisição
   * @returns 409, caso um item com o mesmo código já exista
   * @returns o item editado
   */
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

  /**
   * Deleta um item
   * @returns 404, caso o item não exista
   * @returns 204, caso o item seja deletado
   */
  async delete({ params, response }) {
    const item = await ItensService.obterPeloId(params.id);

    if (!item) {
      return this.notFound(response, 'Esse item não existe.');
    }

    const isDeleted = await ItensService.deletar(item.id);

    if(!isDeleted) {
      return this.conflict(response, "Existem pedidos com esse item.");
    }
    return this.noContent(response);
  }
}
