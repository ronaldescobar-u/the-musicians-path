import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../utils/validation';
import { coursesController } from '../controllers';

const coursesRouter = Router();
/**
* @openapi
* /courses:
*   get:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: searchQuery
*         in: query
*         type: string
*         description: Text search query for courses
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: List of courses
*                 value: '[
*                   { "id": 1, "name": "The Beatles: Begginers Path", "description": "Only easy songs to play by The Beatles", "addedBy": 1 },
*                   { "id": 2, "name": "80s Classics From Beginner to Advanced", "description": "All 80s songs starting from easy ones going through tough ones at the end", "addedBy": 1 }]'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/').get(coursesController.getCourses);

/**
* @openapi
* /courses/{id}:
*   get:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: List of courses
*                 value: '{
*                   "id": 1,
*                   "name": "The Beatles: Begginers Path",
*                   "description": "Only easy songs to play by The Beatles",
*                   "addedBy": 1,
*                   "averageRating": 4.5,
*                   "songs": [
*                     {
*                       "id": 1,
*                       "name": "I want to hold your hand",
*                       "artist": "The Beatles",
*                       "genre": "Rock",
*                       "difficulty": 3,
*                       "addedBy": "John Doe"
*                     },
*                     {
*                       "id": 2,
*                       "name": "Penny Lane",
*                       "artist": "The Beatles",
*                       "genre": "Rock",
*                       "difficulty": 5,
*                       "addedBy": "John Doe"
*                     }
*                   ]}'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
 */
coursesRouter.route('/:id(\\d+)').get(coursesController.getCourse);

/**
* @openapi
* /courses:
*   post:
*     tags: [
*       courses
*     ]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - addedBy
*             properties:
*               name:
*                 type: string
*               description:
*                 type: string
*               addedBy:
*                 type: number
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/').post(
  body('name').notEmpty(),
  body('addedBy').notEmpty().isInt(),
  validate,
  coursesController.createCourse
);

/**
* @openapi
* /courses/{id}:
*   put:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*             properties:
*               name:
*                 type: string
*               description:
*                 type: string
*     responses:
*       200:
*         description: OK
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id(\\d+)').put(coursesController.updateCourse);

/**
* @openapi
* /courses/{id}:
*   delete:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*     responses:
*       200:
*         description: OK
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id(\\d+)').delete(coursesController.deleteCourse);

/**
* @openapi
* /courses/{id}/ratings:
*   get:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: List of courses
*                 value: '[
*                   {
*                     "id": 1,
*                     "user": {
*                       "firstName": "John",
*                       "lastName": "Doe",
*                       "email": "johndoe@email.com"
*                     },
*                     "stars": 5,
*                     "text": "Amazing course!"
*                   },
*                   {
*                     "id": 2,
*                     "user": {
*                       "firstName": "Jane",
*                       "lastName": "Doe",
*                       "email": "janedoe@email.com"
*                     },
*                     "stars": 3,
*                     "text": null
*                   }]'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id(\\d+)/ratings').get(coursesController.getRatingsOfCourse);

/**
* @openapi
* /courses/{id}/ratings:
*   post:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - addedBy
*               - stars
*             properties:
*               addedBy:
*                 type: number
*               stars:
*                 type: number
*               text:
*                 type: string
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id(\\d+)/ratings').post(
  body('addedBy').notEmpty().isInt(),
  body('stars').notEmpty().isFloat({ min: 0, max: 5 }),
  validate,
  coursesController.submitRatingToCourse
);

/**
* @openapi
* /courses/{id}/users:
*   post:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - userId
*               - enrollmentDate
*             properties:
*               userId:
*                 type: number
*               enrollmentDate:
*                 type: string
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id(\\d+)/users').post(
  body('userId').notEmpty().isInt(),
  body('enrollmentDate').notEmpty().isDate(),
  validate,
  coursesController.enrollUserToCourse
);

/**
* @openapi
* /courses/{id}/songs:
*   post:
*     tags: [
*       courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - songId
*               - order
*               - addedBy
*             properties:
*               songId:
*                 type: number
*               order:
*                 type: number
*               addedBy:
*                 type: number
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id(\\d+)/songs').post(
  body('songId').notEmpty().isInt(),
  body('order').notEmpty().isInt(),
  body('addedBy').notEmpty().isInt(),
  validate,
  coursesController.addSongToCourse
);

// put

export default coursesRouter;
