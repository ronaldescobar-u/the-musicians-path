import express, { json, urlencoded } from 'express';
import { coursesRouter, songsRouter, usersRouter, artistsRouter, genresRouter, authenticationRouter } from './routers';
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import verifyToken from './middlewares/authentication';

const app = express();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "The Musician's Path - Vue Academy exercise",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        in: 'header',
        name: 'Authorization',
        description: 'Bearer token to access API endpoints',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [
    { bearerAuth: [] }
  ]
};

const openapiSpecification = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./routers/*.ts"],
});

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification));
app.use("/swagger.json", (req, res) => res.json(openapiSpecification).status(200));

app.use('/authentication', authenticationRouter);

app.all("*", verifyToken);

app.use('/courses', coursesRouter);
app.use('/songs', songsRouter);
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/genres', genresRouter);

const port = 3001;

app.listen(port, () => console.log(`App listening on port: ${port}`));
