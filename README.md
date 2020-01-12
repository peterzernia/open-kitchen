# Open Kitchen

Open Kitchen is an open source web application for sharing recipes built with Golang and React Typescript.

Open Kitchen is bootstrapped from my [Project](https://github.com/peterzernia/project) boilerplate.

## Inspiration

I built Open Kitchen to play around with Typescript as well as my own (very small) component library. No external css or component libraries were used to build this project. The icons come from Material Design and Simple Icons, as unfortunately, I am not a designer. I also wanted to write all of the configuration files (Webpack, Typescript, Babel, Jest etc.) that run behind the scene when using boilerplate clis/projects such as Create React App. I tried to keep the dependencies throughout the app as slim as possible.

## Development

Copy the `.env.dist` file to `.env`.

`make build` builds the docker containers.
`make up` starts the backend & frontend development servers.

The backend server is running on localhost:8001 & the frontend development server is running on localhost:3000. You will see any changes live in both of the servers.

`make open-kitchen` and `make client` build the backend binary and the frontend bundle respectively.

`make sql` opens a psql terminal connected to the development database.

`make test` runs the frontend and backend tests.

`make lint` lints the frontend and backend.

`make clean` stops and removes the docker containers.

## Built with

- [Docker](https://www.docker.com/)
- [Go](https://golang.org/)
- [Typescript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [Postgres](https://www.postgresql.org/)
- [Travis-CI](https://travis-ci.org/)
- [Heroku](https://www.heroku.com/)
