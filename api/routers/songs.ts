import { Request, Router } from 'express';

const songsRouter = Router();

interface SongsQueryParams {
    artistId: number;
    genreId: number;
    searchQuery: string;
}

songsRouter.route('/').get((request: Request<{}, {}, {}, SongsQueryParams>, response) => {
  response.send(`Get songs. Query params: ${request.query}`);
});

songsRouter.route('/:id').get((request: Request<{ id: number }>, response) => {
  response.send(`Get songs. Path param: ${request.params.id}`);
});

songsRouter.route('/').post((request, response) => {
  response.send(`Create songs. Body: ${request.body}`);
});

export default songsRouter;
