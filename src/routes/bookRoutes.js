const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', bookController.getAll)
router.get('/:id', bookController.getOne)
router.post('/',checkRole('admin'), bookController.create)
router.put('/',checkRole('admin'), bookController.update)
router.delete('/',checkRole('admin'), bookController.delete)

module.exports = router