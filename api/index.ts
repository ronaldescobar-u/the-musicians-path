import express from 'express';
import { coursesRouter, songsRouter } from './routers';

const app = express();

app.use('/courses', coursesRouter);
app.use('/songs', songsRouter);

const port = 3000;

app.listen(port, () => console.log(`App listening on port: ${port}`));
