# Tetris

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.
# run?
just git clone it and after npm i, type ng serve -o,play this game

# keyGuide
### transform -> arrowUp
### leftMove -> arrowLeft
### rightMove -> arrowRight


# the framework of this project
1. this project is assembled by a main component, a container component ,and shapeComponent ;
2. Main component is named app.commponent that in charge of load dynamic container component and shapeComponent;
3. Shape component is the shape appear at game's interfae, it's has four-kind-of shape:       
    +  Shape-yi  just like  Chinese characters '一' is a straight and horizontal line;       
    + Shape-shan just like  Chinese characters '山';              
    + Shape-zhi just like Chinese characters '之';                         
    + Shape-tian just like Chinese characters '田' is a square;              
---   
Until tody,2018-08-30-10.15 AM, I finished Shape-shan's transform,animate,move and other function of game.For Example, count Score, the abstract Modal of this game.
Now i hope someone who can establish this game with Me
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
