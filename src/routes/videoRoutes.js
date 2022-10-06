const Router = require('express')
const router = new Router()
const videoController = require('../controllers/videoController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', videoController.getAll)
router.get('/:id', videoController.getOne)
router.post('/',checkRole('admin'), videoController.create)
router.put('/',checkRole('admin'), videoController.update)
router.delete('/',checkRole('admin'), videoController.delete)

module.exports = router