const express = require('express');
const path = require('path');
const settings = require('./settings');

const createServer = () => {
  const app = express();

  app.locals = {
    ...settings,
  };

  app.set('views', path.join(__dirname, 'views'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('view engine', 'pug');
  app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

  app.get('/liveness', (req, res) => {
    res.status(200).send('alive\n');
  });

  app.get('/', (req, res) => {
    res.render('index.pug', { pageTitle: 'Accueil' });
  });

  app.get('/404', (req, res) => {
    res.render('404.pug', { pageTitle: '404 Not found' });
  });

  app.get('*', (req, res) => {
    res.redirect('/404');
  });

  return app;
};

module.exports = { createServer };
