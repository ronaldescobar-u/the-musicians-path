import { Request, Router } from 'express';

const artistsRouter = Router();
/**
* @openapi
* /artists:
*   get:
*     tags: [
*        artists
*     ]
*     responses:
*       200:
*         description: OK
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: List of artists
*                         value: '[
*                          { "id": 1, "name": "The Beatles"}, { "id": 2, "name": "Taylor Swift" }]'
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*
 */
artistsRouter.route('/').get((request, response) => {
  response.send('Get all artists.');
});

export default artistsRouter;
