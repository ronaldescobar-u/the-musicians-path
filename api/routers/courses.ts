import { Request, Router } from 'express';

const coursesRouter = Router();

coursesRouter.route('/').get((request: Request<{}, {}, {}, { searchQuery: string }>, response) => {
  response.send(`Get courses. Query param: ${request.query.searchQuery}`);
});

coursesRouter.route('/:id').get((request: Request<{ id: number }>, response) => {
  response.send(`Get courses. Path param: ${request.params.id}`);
});

coursesRouter.route('/').post((request, response) => {
  response.send(`Create courses. Body: ${request.body}`);
});

export default coursesRouter;
