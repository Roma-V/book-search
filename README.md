# Book search
## Overview
This small app performs search of books with Open Library APIs.
The development stack includes:
- React for DOM manipulation
- Redux for storage
- Typescript for static type checking
- Jest for unit tests

## Usage
The package is managed with Webpack. The following commands apply:\
`npm start` - run webpack server in dev mode\
`npm run test` - run jest\
`npm run eslint` - run eslint on JS and TS codebase\
`npm run build` - build with webpack in production mode into "build" folder

## Deployment
The app is deployed to GitHub Pages through GitHub Actions. `#deploy` keyword in commit message triggers deployment, which results in a run of linter, tests, build and finally deploy to `gh-pages` branch.