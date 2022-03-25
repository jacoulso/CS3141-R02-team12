# TSP-SmartCal
2022 Smart calendar for team software project CS3141 R02

--------------------------------------
## Roll# - Name            - Position Title

31    - Sam Russ        - Scrum Master  
24    - Justin Milliman - Developer     
08    - Jacob Coulson   - Developer     
07    - Ryan Cole       - Developer     
36    - Artiem Sharkota - Developer     

--------------------------------------
# MEAN
This project uses a MEAN SQL flavor development environment

--------------------------------------
# Docker
This project is hosted via docker. 
To setup docker see [Getting Started](https://docs.google.com/document/d/12LbK2ZLiGTFO6RUrYfEkzDgq8ahdVUEdK8qNOcvLeXA/edit)
Running docker:
 - Open a terminal
 - cd "....\CS3141-R02-team12\"
 - docker-compose up -d
 - go to http://localhost:4200/ for the dev webapp
 - go to http://localhost:3000/api for dev server api

--------------------------------------
# MySQL 
This project uses a mySQL server as a backend. DB config is controlled under .\database\init.sql

--------------------------------------
# Express 
This project uses an express server as a linker between the backend and the frontend. checkout /server for details

--------------------------------------
# Angular
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.3.


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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
