var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var questionsRoutes = require('./routes/questionsRoutes.js');
var assessmentRoutes = require('./routes/assessmentRoutes.js');

var app = express();

app.use(bodyParser.json());

app.use(logger('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/questions', questionsRoutes);
app.use('/api/assessment', assessmentRoutes);

app.use((req, res, next) => {
  throw new HttpError('Could not find this route.', 404);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error has occurred!' });
});

try {
  app.listen(process.env.PORT || 5000);
} catch(err) {
  console.log(err);
}