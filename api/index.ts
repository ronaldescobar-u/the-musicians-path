import express from 'express';
import { coursesRouter } from './routers';

const app = express();

app.use('/courses', coursesRouter);

const port = 3000;

app.listen(port, () => console.log(`App listening on port: ${port}`));
