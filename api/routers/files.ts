import { Router } from 'express';
import { body } from 'express-validator';
import validate from '../utils/validation';
import { filesController } from '../controllers';

const filesRouter = Router();

/**
* @openapi
* /files:
*   post:
*     tags: [
*       files
*     ]
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - songId
*               - fileTypeId
*               - content
*             properties:
*               songId:
*                 type: number
*               fileTypeId:
*                 type: number
*               content:
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
filesRouter.route('/').post(
  body('songId').notEmpty().isInt(),
  body('fileTypeId').notEmpty().isInt(),
  body('content').notEmpty(),
  validate,
  filesController.addFileToSong
);

/**
* @openapi
* /files/{id}:
*   delete:
*     tags: [
*       files
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
filesRouter.route('/:id(\\d+)').delete(filesController.removeFileFromSong);

export default filesRouter;
