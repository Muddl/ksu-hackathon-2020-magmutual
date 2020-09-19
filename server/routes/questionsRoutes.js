const express = require('express');

const router = express.Router();

const db = require('../queries/questionQueries');

router.get('/', db.getAllQuestions);
router.get('/:id', db.getSingleQuestion);
router.post('/', db.createQuestion);
router.put('/:id', db.updateQuestion);
router.delete('/:id', db.removeQuestion);

module.exports = router;