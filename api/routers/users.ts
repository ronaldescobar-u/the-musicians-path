import { Request, Router } from 'express';
import { check } from 'express-validator';
import validate from '../utils/validation';

const usersRouter = Router();

/**
* @openapi
* /users:
*   post:
*     tags: [
*       users
*     ]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - firstName
*               - lastName
*               - email
*               - password
*             properties:
*               firstName:
*                 type: string
*               lastName:
*                 type: string
*               email:
*                 type: string
*               password:
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
usersRouter.route('/').post(
  check('email').isEmail(),
  check('password').isStrongPassword(),
  validate,
  (request, response) => {
  response.send(`Register user. Body: ${request.body}`);
});

export default usersRouter;
