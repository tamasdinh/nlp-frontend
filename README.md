# NLP frontend webapp

## Table of Contents

* [Project Goals](#Project-goals)
* [Getting Started](#Getting-started)
* [Built with](#Built-with)
* [Authors](#Authors)
* [Acknowledgments](#Acknowledgments)

## Project goals

The goal of the project was to build a simple frontend that serves up an external NLP API's results to the user. Key functionalities built:
- ```user input checked```
- ```sentiment evaluation returned to user```

The app was built from scratch with ```Webpack``` as the build tool and ```Express.js``` as the API router. On the landing screen the user can input a text and then click on the Submit button to send the text for evaluation. If the text seems to be a url, the app does not send it to Aylien, rather notifies the user. If the input seems to be a non-url text (no further checks are made), then results are obtained from the Aylien API.

## Getting Started

You can clone the project files by running

```bash
git clone https://github.com/tamasdinh/nlp-frontend.git
```

in your command line. This will download the entire repository to your computer, into a subfolder named ```nlp-frontend``` in the folder from which you initiated cloning. Alternatively, you can download the repo as a ```zip``` file from the repo page.

Once you have the repo on your local machine, first you have to install dependencies by ```cd```-ing into the project folder and running:
```bash
npm install
```

You'll have to obtain an API ID and KEY for the Aylien API (you can do that here: [Obtain Aylien API key](https://aylien.com/text-api/)). Once done, you have to insert these into the provided ```.env_EMPTY``` file and then rename it to ```.env```.

Once you have dependencies installed and your API keys obtained, you have 4 options:

1. Run ```npm start``` and then run ```npm run dev```:
    - the first command starts the local API bridge server and the second starts ```webpack-dev-server```. You can try out the app in development mode this way.

2. Run ```npm run prod```
    - this build the production bundle and starts the local server, which in this case not only serves the API bridge but also serves the landing page. You can try out the app in production mode this way.

3. Run ```npm start``` and then run ```npm run test```
    - this start the local API bridge (needed for the tests to run) and then runs all tests defined.

4. Run ```npm run build```
    - this generates the production bundle into the ```/dist``` folder

```ENJOY!```

## Built With

* ```Javascript``` - Starting to grow on me :)
* [Webpack](https://webpack.js.org) - The build tool used. Complicated, but very useful once you get the hang of it
* [Node.js and Node Package Manager](https://nodejs.org/en/) - for handling dependencies and project configuration
* [Babel](https://babeljs.io) - For those nasty transpilations between ES6 and browser-enabled Javascript
* [Express.js](https://expressjs.com) - API server framework used
* [Sass](https://sass-lang.com) - CSS supercharged. Makes responsive styling so much easier!
* [Jest](https://jestjs.io) - Simple testing framework; works with Webpack, Babel, React etc.
* [Aylien API](https://aylien.com/text-api/) - external API to evaluate human-generated text from various aspects
* [Google Chrome](https://www.google.com/chrome) - Probably you already heard of it... ```AND``` it has incredibly useful developer tools built-in.

## Authors

* **Tamas Dinh** - [LinkedIn profile](https://www.linkedin.com/in/tamasdinh/)