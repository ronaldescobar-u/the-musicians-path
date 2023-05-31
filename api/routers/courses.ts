import { Request, Router } from 'express';

const coursesRouter = Router();
/**
* @openapi
* /courses:
*   get:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: searchQuery
*         in: query
*         type: string
*         description: Text search query for courses
*     responses:
*       200:
*         description: OK
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: List of courses
*                         value: '[
*                          { "id": 1, "name": "The Beatles: Begginers Path", "description": "Only easy songs to play by The Beatles", "addedBy": 1 },
*                          { "id": 2, "name": "80s Classics From Beginner to Advanced", "description": "All 80s songs starting from easy ones going through tough ones at the end", "addedBy": 1 }]'
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*
*/
coursesRouter.route('/').get((request: Request<{}, {}, {}, { searchQuery: string }>, response) => {
  response.send(`Get courses. Query param: ${request.query.searchQuery}`);
});

/**
* @openapi
* /courses/{id}:
*   get:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the course to get
*     responses:
*       200:
*         description: OK
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: List of courses
*                         value: '{
*                          "id": 1,
*                          "name": "The Beatles: Begginers Path",
*                          "description": "Only easy songs to play by The Beatles",
*                          "addedBy": 1,
*                          "averageRating": 4.5,
*                          "songs": [
*                            {
*                              "id": 1,
*                              "name": "I want to hold your hand",
*                              "artist": "The Beatles",
*                              "genre": "Rock",
*                              "difficulty": 3,
*                              "addedBy": "John Doe"
*                            },
*                            {
*                              "id": 2,
*                              "name": "Penny Lane",
*                              "artist": "The Beatles",
*                              "genre": "Rock",
*                              "difficulty": 5,
*                              "addedBy": "John Doe"
*                            }
*                          ]}'
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*
 */
coursesRouter.route('/:id').get((request: Request<{ id: number }>, response) => {
  response.send(`Get courses. Path param: ${request.params.id}`);
});

/**
* @openapi
* /courses:
*   post:
*     tags: [
*        courses
*     ]
*     requestBody:
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     required:
*                         - name
*                         - addedBy
*                     properties:
*                         name:
*                             type: string
*                         description:
*                             type: string
*                         addedBy:
*                             type: number
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*
*/
coursesRouter.route('/').post((request, response) => {
  response.send(`Create course. Body: ${request.body}`);
});

/**
* @openapi
* /courses/{id}:
*   put:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the course to update
*     requestBody:
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     required:
*                         - name
*                     properties:
*                         name:
*                             type: string
*                         description:
*                             type: string
*     responses:
*       200:
*         description: OK
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id').put((request, response) => {
  response.send(`Update course by id. Body: ${request.body}`);
});

/**
* @openapi
* /courses/{id}:
*   delete:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the course to delete
*     responses:
*       200:
*         description: OK
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id').delete((request, response) => {
  response.send(`Delete course by id: ${request.params.id}`);
});

/**
* @openapi
* /courses/{id}/ratings:
*   get:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the course to get ratings
*     responses:
*       200:
*         description: OK
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: List of courses
*                         value: '[{
*                            "id": 1,
*                            "user": {
*                              "firstName": "John",
*                              "lastName": "Doe",
*                              "email": "johndoe@email.com"
*                            },
*                            "stars": 5,
*                            "text": "Amazing course!"
*                          },
*                          {
*                            "id": 2,
*                            "user": {
*                              "firstName": "Jane",
*                              "lastName": "Doe",
*                              "email": "janedoe@email.com"
*                            },
*                            "stars": 3,
*                            "text": null
*                          }]'
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*
*/
coursesRouter.route('/:id/ratings').get((request, response) => {
  response.send(`Get ratings of course: ${request.params.id}`);
});

/**
* @openapi
* /courses/{id}/ratings:
*   post:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the course to submit rating to
*     requestBody:
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     required:
*                         - addedBy
*                         - stars
*                     properties:
*                         addedBy:
*                             type: number
*                         stars:
*                             type: number
*                         text:
*                             type: string
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id/ratings').post((request, response) => {
  response.send(`Submit rating for course: ${request.body}`);
});

/**
* @openapi
* /courses/{id}/users:
*   post:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the course to enroll user to
*     requestBody:
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     required:
*                         - userId
*                         - enrollmentDate
*                     properties:
*                         userId:
*                             type: number
*                         enrollmentDate:
*                             type: string
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id/users').post((request, response) => {
  response.send(`Enroll user to course: ${request.body}`);
});

/**
* @openapi
* /courses/{id}/songs:
*   post:
*     tags: [
*        courses
*     ]
*     parameters:
*       - name: id
*         in: path
*         type: integer
*         description: Id of the course to add song to
*     requestBody:
*         content:
*             application/json:
*                 schema:
*                     type: object
*                     required:
*                         - songId
*                         - order
*                         - addedBy
*                     properties:
*                         songId:
*                             type: number
*                         order:
*                             type: number
*                         addedBy:
*                             type: number
*     responses:
*       201:
*         description: Created
*       401:
*         description: Unauthorized
*         content:
*             application/json:
*                 examples:
*                     jsonObject:
*                         summary: An example JSON response
*                         value: '{ "message": "Unauthorized" }'
*/
coursesRouter.route('/:id/songs').post((request, response) => {
  response.send(`Add song to course: ${request.body}`);
});

export default coursesRouter;
