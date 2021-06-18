# 1851 FE

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## SSR

`npm run dev:ssr`

This command is similar to ng serve, which offers live reload during development, but uses server-side rendering. The application will run in watch mode and refresh the browser after every change. This command is slower than the actual ng serve command.

`ng build && ng run app-name:server`

This command builds both the server script and the application in production mode. Use this command when you want to build the project for deployment.

`npm run serve:ssr`

This command starts the server script for serving the application locally with server-side rendering. It uses the build artifacts created by ng run `build:ssr`, so make sure you have run that command as well.

Note that serve:ssr is not intended to be used to serve your application in production, but only for testing the server-side rendered application locally.