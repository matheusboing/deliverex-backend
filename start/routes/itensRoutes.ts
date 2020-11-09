import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get(':id', 'ItensController.get');
  Route.post('/', 'ItensController.post');
  Route.get('/', 'ItensController.getAll');
  Route.put(':id', 'ItensController.put');
  Route.delete(':id', 'ItensController.delete');
}).prefix('itens');
