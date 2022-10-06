const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const libraryRoutes = require('./libraryRoutes')
const courseRoutes = require('./courseRoutes')
const bookRoutes = require('./bookRoutes')
const videoRoutes = require('./videoRoutes')

router.use('/user', userRouter)
router.use('/library', libraryRoutes)
router.use('/course', courseRoutes)
router.use('/library/book', bookRoutes)
router.use('/course/video', videoRoutes)

module.exports = router