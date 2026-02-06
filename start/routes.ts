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
router.get('/documents/:id', '#controllers/documents_controller.show')

// document embeddings
router.post('/documents/:id/chunks', '#controllers/document_embeddings_controller.chunk')
router.post('/documents/:id/embeddings', '#controllers/document_embeddings_controller.embeddings')
