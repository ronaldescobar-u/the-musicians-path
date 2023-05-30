import express from 'express';
import { coursesRouter, songsRouter, usersRouter } from './routers';

const app = express();

app.use('/courses', coursesRouter);
app.use('/songs', songsRouter);
app.use('/users', usersRouter);

const port = 3001;

app.listen(port, () => console.log(`App listening on port: ${port}`));
