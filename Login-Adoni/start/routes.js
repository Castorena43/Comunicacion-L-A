'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.post('/registrar','UserController.registro');
Route.post('/iniciar','UserController.login');
Route.post('/cerrar','UserController.logout').middleware(['auth:api']);
Route.post('/consumir','UserController.consumir').middleware(['auth:api','CheckUser']);
Route.post('/prueba','UserController.prueba');