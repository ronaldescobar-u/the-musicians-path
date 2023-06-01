import { Request, Router } from 'express';
import { body, query } from 'express-validator';
import validate from '../utils/validation';

const songsRouter = Router();

interface SongsQueryParams {
  artistId: number;
  genreId: number;
  searchQuery: string;
}

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
  (request: Request<{}, {}, {}, SongsQueryParams>, response) => {
    response.send(`Get songs. Query params: ${request.query}`);
  });

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
songsRouter.route('/:id(\\d+)').get((request: Request<{ id: number }>, response) => {
  response.send(`Get songs. Path param: ${request.params.id}`);
});

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
*               - addedBy
*             properties:
*               name:
*                 type: string
*               artistId:
*                 type: integer
*               genreId:
*                 type: integer
*               difficulty:
*                 type: integer
*               addedBy:
*                 type: integer
*               files:
*                 type: array
*                 items:
*                   type: object
*                   properties:
*                     fileTypeId:
*                       type: number
*                     value:
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
  body('name').notEmpty(),
  body('artistId').notEmpty().isInt(),
  body('genreId').notEmpty().isInt(),
  body('difficulty').isInt({ min: 1, max: 10 }),
  body('addedBy').notEmpty().isInt(),
  body('files').isArray().isLength({ min: 1 }),
  body('files.*.fileTypeId').notEmpty().isInt(),
  body('files.*.value').notEmpty(),
  validate,
  (request, response) => {
    response.send(`Create songs. Body: ${request.body}`);
  });

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
  (request: Request<{ id: number }>, response) => {
    response.send(`Update song by id. Body: ${request.body}`);
  });

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
songsRouter.route('/:id(\\d+)').delete((request: Request<{ id: number }>, response) => {
  response.send(`Delete song by id: ${request.params.id}`);
});

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
songsRouter.route('/:id(\\d+)/comments').get((request: Request<{ id: number }>, response) => {
  response.send(`Get comments of song. Path param: ${request.params.id}`);
});

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
*               - addedBy
*             properties:
*               addedBy:
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
songsRouter.route('/:id(\\d+)/comments').post(
  body('addedBy').notEmpty().isInt(),
  body('text').notEmpty(),
  validate,
  (request: Request<{ id: number }>, response) => {
    response.send(`Post comment to song. Body: ${request.body}`);
  });

export default songsRouter;
