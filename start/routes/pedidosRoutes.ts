import Route from '@ioc:Adonis/Core/Route';

/**
 * Rotas de pedidos
 */
Route.group(() => {
  Route.get(':id', 'PedidosController.get');
  Route.post('/', 'PedidosController.post');
  Route.get('/', 'PedidosController.getAll');
  Route.put(':id', 'PedidosController.put');
  Route.patch(':id', 'PedidosController.patch');
  Route.delete(':id', 'PedidosController.delete');
}).prefix('pedidos');
