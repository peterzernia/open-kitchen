# Project

Project is a boilerplate web application project built with Go & Typescript. Skip through the initial setup of a project while keeping the dependencies as minimal as possible. Project's configuration is completely exposed, allowing you to change at will. Project provides a user model and auth api endpoints on the backend as well as authentication routes on the frontend.

Project ships with configuration for Docker, Travis-CI for continuous integration and Heroku for deployment.

## Usage

- Click the [Use this template](https://github.com/peterzernia/project/generate) button
- Clone the repository
- Change all the paths referencing `peterzernia/project` to your username & project name
- Copy `.env.dist` to a `.env`
- Run `make build` to build Docker container
- Run `make up` to run the servers

The frontend development server runs on `localhost:3000`.
The backend server runs on `localhost:8001`

## Tests

Run `make test` to run all the tests suites
`make test-js` and `make test-go` will test the frontend and backend respectively

Setup your project on [Travis-CI](https://travis-ci.org/) and push changes to see the CI build and run tests. For the deployment step, setup your heroku project and change the name in `.travis.yml` to match along with your own Heroku api key. More info [here](https://docs.travis-ci.com/user/deployment/heroku/).

## Deployment

Setup a Heroku project with a Golang and Nodejs buildpack. Change all references of `project` and `project-boilerplate` in the code to reference your own Heroku project. More info [here](https://devcenter.heroku.com/categories/deployment).

## Built with

[Docker](https://www.docker.com/)
[Go](https://golang.org/)
[Typescript](https://www.typescriptlang.org/)
[React](https://reactjs.org/)
[Webpack](https://webpack.js.org/)
[Travis-CI](https://travis-ci.org/)
[Heroku](https://www.heroku.com/)
[Postgres](https://www.postgresql.org/)
