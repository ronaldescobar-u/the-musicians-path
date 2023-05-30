import express from 'express';
import { coursesRouter, songsRouter, usersRouter, artistsRouter, genresRouter } from './routers';
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "The Musician's Path - Vue Academy exercise",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ]
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});



app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) => res.json(openapiSpecification).status(200));

app.use('/courses', coursesRouter);
app.use('/songs', songsRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/genres', genresRouter);

const port = 3001;

app.listen(port, () => console.log(`App listening on port: ${port}`));
