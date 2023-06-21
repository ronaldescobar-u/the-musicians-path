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
  body('email').notEmpty().withMessage('Email is required.').isEmail().withMessage('Invalid email.'),
  body('password').notEmpty().withMessage('Password is required.'),
  validate,
  authenticationController.authenticate
);

/**
* @openapi
* /refresh:
*   get:
*     tags: [
*       authentication
*     ]
*     responses:
*       200:
*         description: OK
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 value: '{ "accessToken": "string", "refreshToken": "string" }'
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
authenticationRouter.route('/refresh').get(
  authenticationController.refresh
);

export default authenticationRouter;
