import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../utils/validation';
import { authenticationController } from '../controllers';

const authenticationRouter = Router();

/**
* @openapi
* /authentication:
*   post:
*     tags: [
*       authentication
*     ]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - email
*               - password
*             properties:
*               email:
*                 type: string
*               password:
*                 type: string
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 value: '{ "accessToken": "string" }'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
authenticationRouter.route('/').post(
  body('email').notEmpty().isEmail(),
  body('password').notEmpty(),
  validate,
  authenticationController.authenticate
);

export default authenticationRouter;
