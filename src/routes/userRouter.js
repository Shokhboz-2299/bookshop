const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: your name
 *         email:
 *           type: string
 *           description: write email
 *         password:
 *           type: string
 *           description: more than 4
 *       example:
 *         id: 1
 *         name: Shokhboz Kaumutov
 *         email:shokhbozkaumutov@gmail.com
 *         password:23456
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The user managing API
  */

/**
 * @swagger
 * /api/user/registration:
 *   post:
 *     summary: create new user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: user successfully registrated
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/registration', userController.registration)

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: you have write email and password
 *     tags: [User]
 *     responses:
 *       200:
 *         description: if you already registrated, token will given you
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)


/**
 * @swagger
 * /api/user/change/{id}:
 *   put:
 *     summary:  user role will update to admin
 *     tags: [User]
 *     responses:
 *       200:
 *         description: role will be admin
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.put('/change/:id',checkRole('superadmin'), userController.changeAdmin)


/**
 * @swagger
 * /api/user/users:
 *   get:
 *     summary: get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: allow to only admins 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users',checkRole('admin'), userController.getAllUsers)

module.exports = router