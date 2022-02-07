// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const session = require('express-session')
const store = require('connect-mongo')

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');


const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// default value for title local
const projectName = 'lab-movies-celebrities';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

app.use(
    session({
      secret: 'helloworld',
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        maxAge: 1200000,
      },
      store: store.create({
        mongoUrl: 'mongodb://localhost/lab-movies-celebrities',
      }),
    })
  )

  app.use((req,res,next) => {
    res.locals.currentUser = req.session.currentUser
    next()
  })

// 👇 Start handling routes here
const index = require('./routes/index');
app.use('/', index);


const celebRouter = require('./routes/celebrities.routes')
app.use('/', celebRouter)
const movieRouter = require('./routes/movies.routes')
app.use('/', movieRouter)
const userRouter = require('./routes/user.routes')
app.use('/user', userRouter)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
