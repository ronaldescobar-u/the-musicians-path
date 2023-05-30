import { Request, Router } from 'express';

const usersRouter = Router();

usersRouter.route('/').post((request, response) => {
  response.send(`Register user. Body: ${request.body}`);
});

export default usersRouter;
