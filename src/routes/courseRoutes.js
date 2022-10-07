const Router = require('express')
const router = new Router()
const courseController = require('../controllers/courseController')
const checkRole = require('../middleware/checkRoleMiddleware')

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - name 
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the course type
 *         name:
 *           type: string
 *           description: The course type
 *       example:
 *         id: 1
 *         name: English course
 */

 /**
  * @swagger
  * tags:
  *   name: Course
  *   description: The course types managing API
  */

/**
 * @swagger
 * /api/course:
 *   get:
 *     summary: Returns the list of all the course types
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: The list of the course type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */



router.get('/', courseController.getAll)

/**
* @swagger
* /api/course:
*   post:
*     summary: Create a new course, you have to have token and your token should be role='admin'
*     tags: [Course]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Course'
*     responses:
*       200:
*         description: The course was successfully created
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Course'
*       500:
*         description: Some server error
*/


router.post('/',checkRole('admin'), courseController.create)

/**
* @swagger
* /api/course/{id}:
*  put:
*    summary: Update the course by the id
*    tags: [Course]
*    parameters:
*      - in: path
*        name: id
*        schema:
*          type: string
*        required: true
*        description: The course id
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            $ref: '#/components/schemas/Course'
*    responses:
*      200:
*        description: The course was updated
*        content:
*          application/json:
*            schema:
*              $ref: '#/components/schemas/Course'
*      404:
*        description: The course was not found
*      500:
*        description: Some error happened
*/
router.put('/:id',checkRole('admin'), courseController.updateLibrary)


/**
* @swagger
* /api/course/{id}:
*   delete:
*     summary: Remove the course by id
*     tags: [Course]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The course id
* 
*     responses:
*       200:
*         description: The course was deleted
*       404:
*         description: The course was not found
*/
router.delete('/:id',checkRole('admin'), courseController.deleteLibrary)

module.exports = router