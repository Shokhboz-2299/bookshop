const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')
const checkRole = require('../middleware/checkRoleMiddleware')


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *         - img
 *         - libraryId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The book title
 *         desc:
 *           type: string
 *           description: The book description
 *         img:
 *           type: string
 *           description: The book image
 *         libraryId:
 *           type: integer
 *           description: id from library table
 *       example:
 *         id: 1
 *         name: The New Turing Omnibus
 *         desc: Alexander K. Dewdney was wrote
 *         img: 1e6b5a32-1a47-4ca4-a143-fb74fb543806.jpg
 *         libraryId: 1
 */

 /**
  * @swagger
  * tags:
  *   name: Books
  *   description: The books managing API
  */

/**
 * @swagger
 * /api/library/book:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
 router.get('/', bookController.getAll)

 /**
 * @swagger
 * /api/library/book/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */

router.get('/:id', bookController.getOne)

/**
 * @swagger
 * /api/library/book:
 *   post:
 *     summary: Create a new book, you have to have token and your token should be role='admin'
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */
router.post('/',checkRole('admin'), bookController.create)

/**
 * @swagger
 * /api/library/book/{id}:
 *  put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id',checkRole('admin'), bookController.update)


/**
 * @swagger
 * /api/library/book/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 * 
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

router.delete('/',checkRole('admin'), bookController.delete)

module.exports = router