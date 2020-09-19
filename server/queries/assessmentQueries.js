const db = require('../db');

// Assessment CRUD

// getAll
const getAllAssessments = (req, res, next) => {
  db.any('SELECT * FROM assessment')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL assessments'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// getSingle
const getSingleAssessment = (req, res, next) => {
  var aid = parseInt(req.params.id);
  db.one('SELECT * FROM assessment WHERE assessment_id = $1', aid)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE assessment'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// create
const createAssessment = (req, res, next) => {
  db.none('INSERT INTO assessment(assessment_id, title, description, category)' + 
      'values(DEFAULT, ${title}, ${description}, ${category}',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one assessment'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// update
const updateAssessment = (req, res, next) => {
  db.none('UPDATE assessment SET title = $1, description = $2, category = $3 WHERE assessment_id = $4',
    [req.body.title, req.body.description, req.body.category, parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated assessment'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

// remove
const removeAssessment = (req, res, next) => {
  db.result('DELETE FROM assessment WHERE assessment_id = $1', parseInt(req.params.id))
    .then((result) => {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} assessments`
        });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getAllAssessments: getAllAssessments,
  getSingleAssessment: getSingleAssessment,
  createAssessment: createAssessment,
  updateAssessment: updateAssessment,
  removeAssessment: removeAssessment
};