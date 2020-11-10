export default abstract class BaseController {
  /**
   * Retorna uma resposta de erro HTTP
   * @param response Resposta da requisição
   * @param code Código de status HTTP
   * @param message Mensagem da erro
   * @param details Detalhes da erro
   */
  private createErrorResponse(response: any, code: number, message: string, details?: any) {
    return response.status(code).send({ code, message, details });
  }

  /**
   * Retorna uma resposta HTTP com o status 409
   * @param response Resposta da requisição
   * @param message Mensagem da erro
   * @param details Detalhes da erro
   */
  public conflict(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 409, message, details);
  }

  /**
   * Retorna uma resposta HTTP com o status 404
   * @param response Resposta da requisição
   * @param message Mensagem da erro
   * @param details Detalhes da erro
   */
  public notFound(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 404, message, details);
  }

  /**
   * Retorna uma resposta HTTP com o status 400
   * @param response Resposta da requisição
   * @param message Mensagem da erro
   * @param details Detalhes da erro
   */
  public badRequest(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 400, message, details);
  }

  /**
   * Retorna uma resposta HTTP com o status 422
   * @param response Resposta da requisição
   * @param message Mensagem da erro
   * @param details Detalhes da erro
   */
  public unprocessableEntity(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 422, message, details);
  }

  /**
   * Retorna uma resposta HTTP com o status 204
   * @param response Resposta da requisição
   * @param message Mensagem da erro
   * @param details Detalhes da erro
   */
  public noContent(response: any) {
    return this.createErrorResponse(response, 204, '');
  }
}
