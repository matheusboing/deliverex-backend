export default abstract class BaseController {
  private createErrorResponse(response: any, code: number, message: string, details?: any) {
    return response.status(code).send({ code, message, details })
  }

  public conflict(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 409, message, details);
  }

  public notFound(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 404, message, details);
  }

  public badRequest(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 400, message, details);
  }

  public unprocessableEntity(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 422, message, details);
  }

  public noContent(response: any) {
    return this.createErrorResponse(response, 204, '');
  }
}
