import { Router } from 'express';
import { body, oneOf } from 'express-validator';
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
*             properties:
*               name:
*                 type: string
*               description:
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
coursesRouter.route('/').post(
  body('name').notEmpty().withMessage("Name is required."),
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
coursesRouter.route('/:id(\\d+)').put(
  oneOf(
    [body('name').exists().notEmpty(), body('description').exists()],
    { message: 'Please update at least one of the fields (name, description).' }
  ),
  validate,
  coursesController.updateCourse
);

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
*               - stars
*             properties:
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
  body('stars').isFloat({ min: 0, max: 5 }).withMessage('Stars should be a number between 0 and 5.'),
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
*               - enrollmentDate
*             properties:
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
  body('enrollmentDate').isDate().withMessage('Invalid date'),
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
*             properties:
*               songId:
*                 type: number
*               order:
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
  body('songId').isInt().withMessage('Song ID should be int.'),
  body('order').isInt().withMessage('Order should be int.'),
  validate,
  coursesController.addSongToCourse
);

export default coursesRouter;
