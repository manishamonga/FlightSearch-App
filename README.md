# A Flight Search Engine developed with AngularJS

## Install dependencies

After git clone you should install the applications dependencies into your favorite directory.
Open the terminal and type `npm install`. This will install all dependencies.

## Run the application

To run the application type `npm start`. This will start the live server and the application will be available at http://localhost:8080.
Please make sure that the port 8080 is available and there is no any other application running on that port.
Open your favorite browser and navigate to http://localhost:8080.
Here you will see the application folders/files.
Click the `app` folder in the browser and the application will open for you :)

## Functional (manual) testing

By refining the price, flights will automatically updated according to the given range.
Changing `One way` option to `Return` will rerender the result and vice-versa. 

## Unit test the application

To run unit tests of the application type `npm test`. This will run the Karma and will go through all the unit tests available and will try to run.
If every unit test runs successfully you will see the "SUCCESS" green message on the terminal.
If any test fails you will see the "Failure" red message on the terminal.

## File structure

All business logic related files are located inside `app` folder.
The bootstrap point of the application is `/app/index.html`.

----app                      | This is the root folder of the applications business logic.<br />
--------assets               | Folder for all css, images etc.<br />
--------modules              | This folder is for keeping the JavaScript files (e.g. Angular modules, directives, services, controllers, etc.).<br />
--------lib                  | Folder for all required libraries.<br />
--------------controllers.js | Here are all controllers defined.<br />


----node_modules             | Node dependencies.<br />
----unit-tests               | All unit tests are located into this folder.<br />
--------flight_test.spec.js  | All unit tests which are testing the controllers are defined here.<br />


## Environment dependencies

git: http://git-scm.com/<br />
npm: https://www.npmjs.org/<br />
node: http://nodejs.org<br />
jasmine: http://jasmine.github.io<br />
karma: http://karma-runner.github.io<br />

