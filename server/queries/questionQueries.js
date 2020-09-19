const db = require('../db');

// Question CRUD

// getAll
const getAllQuestions = (req, res, next) => {
  db.any('SELECT * FROM questions')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL questions'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// getSingle
const getSingleQuestion = (req, res, next) => {
  var qid = parseInt(req.params.id);
  db.one('SELECT * FROM questions WHERE questions_id = $1', qid)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE question'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// create
const createQuestion = (req, res, next) => {
  db.none('INSERT INTO questions(questions_id, question)' + 
      'values(DEFAULT, ${question})',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one question'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// update
const updateQuestion = (req, res, next) => {
  db.none('UPDATE questions SET question = $1 WHERE question_id = $2',
    [req.body, parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated question'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// remove
const removeQuestion = (req, res, next) => {
  db.result('DELETE FROM questions WHERE question_id = $1', parseInt(req.params.id))
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} question`
        });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getAllQuestions: getAllQuestions,
  getSingleQuestion: getSingleQuestion,
  createQuestion: createQuestion,
  updateQuestion: updateQuestion,
  removeQuestion: removeQuestion
};