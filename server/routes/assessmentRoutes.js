const express = require('express');

const router = express.Router();

const db = require('../queries/assessmentQueries');

router.get('/', db.getAllAssessments);
router.get('/:id', db.getSingleAssessment);
router.post('/', db.createAssessment);
router.put('/:id', db.updateAssessment);
router.delete('/:id', db.removeAssessment);

module.exports = router;