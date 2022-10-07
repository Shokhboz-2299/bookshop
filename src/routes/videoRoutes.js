const Router = require('express')
const router = new Router()
const videoController = require('../controllers/videoController')
const checkRole = require('../middleware/checkRoleMiddleware')


/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - name
 *         - desc
 *         - video
 *         - courseId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the video
 *         name:
 *           type: string
 *           description: The video title
 *         desc:
 *           type: string
 *           description: The video description
 *         video:
 *           type: string
 *           description: The video image file
 *         courseId:
 *           type: integer
 *           description: id from video table
 *       example:
 *         id: 1
 *         name: London
 *         desc: video course about London
 *         video: 1e6b5a32-1a47-4ca4-a143-fb74fb543806.jpg
 *         courseId: 1
 */

 /**
  * @swagger
  * tags:
  *   name: Video
  *   description: The video managing API
  */

/**
 * @swagger
 * /api/course/video:
 *   get:
 *     summary: Returns the list of all the videos
 *     tags: [Video]
 *     responses:
 *       200:
 *         description: The list of the videos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Video'
 */
router.get('/', videoController.getAll)


/**
 * @swagger
 * /api/course/video/{id}:
 *   get:
 *     summary: Get the video by id
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The video id
 *     responses:
 *       200:
 *         description: The video description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       404:
 *         description: The video was not found
 */
router.get('/:id', videoController.getOne)

/**
 * @swagger
 * /api/course/video:
 *   post:
 *     summary: Create a new video, you have to have token and your token should be role='admin'
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Video'
 *     responses:
 *       200:
 *         description: The video was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 *       500:
 *         description: Some server error
 */
router.post('/',checkRole('admin'), videoController.create)

/**
 * @swagger
 * /api/course/video/{id}:
 *  put:
 *    summary: Update the video by the id
 *    tags: [Video]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The video id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Video'
 *    responses:
 *      200:
 *        description: The video was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Video'
 *      404:
 *        description: The video was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id',checkRole('admin'), videoController.update)

/**
 * @swagger
 * /api/course/video/{id}:
 *   delete:
 *     summary: Remove the video by id
 *     tags: [Video]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The video id
 * 
 *     responses:
 *       200:
 *         description: The video was deleted
 *       404:
 *         description: The video was not found
 */
router.delete('/:id',checkRole('admin'), videoController.delete)

module.exports = router