const Router = require('express')
const router = new Router()
const libraryController = require('../controllers/libraryController')
const checkRole = require('../middleware/checkRoleMiddleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     Library:
 *       type: object
 *       required:
 *         - name 
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the library type
 *         name:
 *           type: string
 *           description: The library type
 *       example:
 *         id: 1
 *         name: Historical
 */

 /**
  * @swagger
  * tags:
  *   name: Library
  *   description: The library types managing API
  */

/**
 * @swagger
 * /api/library:
 *   get:
 *     summary: Returns the list of all the library types
 *     tags: [Library]
 *     responses:
 *       200:
 *         description: The list of the library type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Library'
 */


router.get('/', libraryController.getAll)


/**
* @swagger
* /api/library:
*   post:
*     summary: Create a new library, you have to have token and your token should be role='admin'
*     tags: [Library]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Library'
*     responses:
*       200:
*         description: The library was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Library'
*       500:
*         description: Some server error
*/

router.post('/',checkRole('admin'), libraryController.create)
/**
* @swagger
* /api/library/{id}:
*  put:
*    summary: Update the library by the id
*    tags: [Library]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: The library id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Library'
*    responses:
*      200:
*        description: The library was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Library'
*      404:
*        description: The library was not found
*      500:
*        description: Some error happened
*/
router.put('/:id',checkRole('admin'), libraryController.updateLibrary)

/**
* @swagger
* /api/library/{id}:
*   delete:
*     summary: Remove the library by id
*     tags: [Library]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The library id
* 
*     responses:
*       200:
*         description: The library was deleted
*       404:
*         description: The library was not found
*/
router.delete('/:id',checkRole('admin'), libraryController.deleteLibrary)

module.exports = router

