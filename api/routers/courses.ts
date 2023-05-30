import { Request, Router } from 'express';

const coursesRouter = Router();

coursesRouter.route('/').get((request: Request<{}, {}, {}, { searchQuery: string }>, response) => {
  response.send(`Get courses. Query param: ${request.query.searchQuery}`);
});

coursesRouter.route('/:id').get((request: Request<{ id: number }>, response) => {
  response.send(`Get courses. Path param: ${request.params.id}`);
});

coursesRouter.route('/').post((request, response) => {
  response.send(`Create course. Body: ${request.body}`);
});

coursesRouter.route('/:id').put((request, response) => {
  response.send(`Update course by id. Body: ${request.body}`);
});

coursesRouter.route('/:id').delete((request, response) => {
  response.send(`Delete course by id: ${request.params.id}`);
});

coursesRouter.route('/:id/ratings').delete((request, response) => {
  response.send(`Get ratings of course: ${request.params.id}`);
});

coursesRouter.route('/:id/ratings').get((request, response) => {
  response.send(`Get ratings of course: ${request.params.id}`);
});

coursesRouter.route('/:id/ratings').post((request, response) => {
  response.send(`Submit rating for course: ${request.body}`);
});

coursesRouter.route('/:id/users').post((request, response) => {
  response.send(`Enroll user to course: ${request.body}`);
});

coursesRouter.route('/:id/songs').post((request, response) => {
  response.send(`Add song to course: ${request.body}`);
});

export default coursesRouter;
