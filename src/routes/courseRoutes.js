const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', courseController.getAll)
router.post('/',checkRole('admin'), courseController.create)
router.put('/',checkRole('admin'), courseController.updateLibrary)
router.delete('/',checkRole('admin'), courseController.deleteLibrary)

module.exports = router