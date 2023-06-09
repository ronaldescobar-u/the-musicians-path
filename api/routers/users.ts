import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../utils/validation';
import { usersController } from '../controllers';

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
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').notEmpty().isEmail(),
  body('password').notEmpty().isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
  validate,
  usersController.createUser
);

/**
* @openapi
* /users/{id}:
*   put:
*     tags: [
*       users
*     ]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
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
*       204:
*         description: No Content
*       401:
*         description: Unauthorized
*         content:
*           application/json:
*             examples:
*               jsonObject:
*                 summary: An example JSON response
*                 value: '{ "message": "Unauthorized" }'
*/
usersRouter.route('/:id(\\d+)').put(
  body('email').optional().isEmail(),
  body('password').optional().isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
  validate,
  usersController.updateUser
);

export default usersRouter;
