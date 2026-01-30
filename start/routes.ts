/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', '#controllers/roots_controller.index')
// documents
router.get('/documents', '#controllers/documents_controller.index')
router.post('/documents', '#controllers/documents_controller.store')
router.delete('/documents', '#controllers/documents_controller.destroy')
// router.resource('/documents', '#controllers/documents_controller').apiOnly()
