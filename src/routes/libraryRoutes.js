const Router = require('express')
const router = new Router()
const libraryController = require('../controllers/libraryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', libraryController.getAll)
router.post('/',checkRole('admin'), libraryController.create)
router.put('/',checkRole('admin'), libraryController.updateLibrary)
router.delete('/',checkRole('admin'), libraryController.deleteLibrary)

module.exports = router

