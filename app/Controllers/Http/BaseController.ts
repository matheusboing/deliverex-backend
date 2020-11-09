export default abstract class BaseController {
  private createErrorResponse(response: any, code: number, message: string, details?: any) {
    return response.status(code).send({ code, message, details })
  }

  public conflictResponse(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 409, message, details)
  }

  public notFoundResponse(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 404, message, details)
  }

  public badRequestResponse(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 400, message, details)
  }

  public unprocessableEntityResponse(response: any, message: string, details?: any) {
    return this.createErrorResponse(response, 422, message, details)
  }

  public noContentResponse(response: any) {
    return this.createErrorResponse(response, 204, '')
  }
}
