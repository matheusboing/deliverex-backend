import Route from '@ioc:Adonis/Core/Route';

/**
 * Rotas de itens
 */
Route.group(() => {
  Route.get(':id', 'ItensController.get');
  Route.get('/codigo/:codigo', 'ItensController.getByCodigo');
  Route.post('/', 'ItensController.post');
  Route.get('/', 'ItensController.getAll');
  Route.put(':id', 'ItensController.put');
  Route.delete(':id', 'ItensController.delete');
}).prefix('itens');
