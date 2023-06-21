import { Request, Router } from 'express';
import { body, oneOf, query } from 'express-validator';
import validate from '../utils/validation';
import { songsController } from '../controllers';

const songsRouter = Router();

/**
* @openapi
* /songs:
*   get:
*     tags: [
*       songs
*     ]
*     parameters:
*       - name: artistId
*         in: query
*         type: integer
*       - name: genreId
*         in: query
*         type: integer
*       - name: searchQuery
*         in: query
*         type: string
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
*                     "name": "I want to hold your hand",
*                     "artist": "The Beatles",
*                     "genre": "Rock",
*                     "difficulty": 3,
*                     "addedBy": "John Doe"
*                   },
*                   {
*                     "id": 2,
*                     "name": "Penny Lane",
*                     "artist": "The Beatles",
*                     "genre": "Rock",
*                     "difficulty": 5,
*                     "addedBy": "John Doe"
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
songsRouter.route('/').get(
  query('artistId').optional().isInt(),
  query('genreId').optional().isInt(),
  query('searchQuery').optional(),
  validate,
  songsController.getSongs
);

/**
* @openapi
* /songs/{id}:
*   get:
*     tags: [
*       songs
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
*                   "id": 2,
*                   "name": "I want to hold your hand",
*                   "artist": "The Beatles",
*                   "genre": "Rock",
*                   "difficulty": 3,
*                   "addedBy": 1,
*                   "songFiles": [
*                     {
*                       "fileTypeId": 1,
*                       "fileType": "Plain text tab",
*                       "content": "C D Gm A"
*                     },
*                     {
*                       "fileTypeId": 2,
*                       "fileType": "YouTube Link",
*                       "content": "https://www.youtube.com/"
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
songsRouter.route('/:id(\\d+)').get(songsController.getSong);

/**
* @openapi
* /songs:
*   post:
*     tags: [
*       songs
*     ]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - artistId
*               - genreId
*               - difficulty
*             properties:
*               name:
*                 type: string
*               artistId:
*                 type: integer
*               genreId:
*                 type: integer
*               difficulty:
*                 type: integer
*               files:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     fileTypeId:
*                       type: number
*                     content:
*                       type: string
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
songsRouter.route('/').post(
  body('name').notEmpty().withMessage('Name is required.'),
  body('artistId')
    .notEmpty()
    .withMessage('Artist ID is required.')
    .isInt()
    .withMessage('Artist ID should be int.'),
  body('genreId')
    .notEmpty()
    .withMessage('Genre ID is required.')
    .isInt()
    .withMessage('Genre ID should be int.'),
  body('difficulty')
    .isInt({ min: 1, max: 10 })
    .withMessage('Difficulty should be int and it should be between 1 to 10.'),
  body('files')
    .isArray({ min: 1 })
    .withMessage('Files should be array with at least one element.'),
  body('files.*.fileTypeId')
    .notEmpty()
    .withMessage('File type ID is required.')
    .isInt()
    .withMessage('File type ID should be int.'),
  body('files.*.content').notEmpty().withMessage('Content is required.'),
  validate,
  songsController.createSong
);

/**
* @openapi
* /songs/{id}:
*   put:
*     tags: [
*       songs
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the song to update
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*               artistId:
*                 type: integer
*               genreId:
*                 type: integer
*               difficulty:
*                 type: integer
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
songsRouter.route('/:id(\\d+)').put(
  oneOf(
    [body('name').exists().notEmpty(), body('artistId').exists().notEmpty()],
    { message: 'Please update at least one of the fields (name, description).' }
  ),
  validate,
  songsController.updateSong
);

/**
* @openapi
* /songs/{id}:
*   delete:
*     tags: [
*       songs
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
songsRouter.route('/:id(\\d+)').delete(songsController.deleteSong);

/**
* @openapi
* /songs/{id}/comments:
*   get:
*     tags: [
*       songs
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
*                 summary: List of comments
*                 value: '[
*                   {
*                     "id": 1,
*                     "user": {
*                       "firstName": "John",
*                       "lastName": "Doe",
*                       "email": "johndoe@email.com"
*                     },
*                     "text": "I cant play the transition between C and G chords. Any advice?"
*                   },
*                   {
*                     "id": 2,
*                     "user": {
*                       "firstName": "Jane",
*                       "lastName": "Doe",
*                       "email": "janedoe@email.com"
*                     },
*                     "text": "Try playing G in 2nd inversion!"
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
songsRouter.route('/:id(\\d+)/comments').get(songsController.getCommentsOfSong);

/**
* @openapi
* /songs/{id}/comments:
*   post:
*     tags: [
*       songs
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
*               - text
*             properties:
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
songsRouter.route('/:id(\\d+)/comments').post(
  body('text').notEmpty().withMessage('Text is required.'),
  validate,
  songsController.postCommentToSong
);

export default songsRouter;
