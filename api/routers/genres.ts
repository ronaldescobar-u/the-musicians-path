import { Router } from 'express';
import { genresController } from '../controllers';

const genresRouter = Router();

/**
* @openapi
* /genres:
*   get:
*     tags: [
*       genres
*     ]
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: List of genres
*                 value: '[{ "id": 1, "name": "Rock"}, { "id": 2, "name": "Pop" }]'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
 */
genresRouter.route('/').get(genresController.getGenres);

export default genresRouter;
