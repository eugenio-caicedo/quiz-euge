var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

/* GET quizes*/
// Preguntas
router.get('/quizes/question', quizController.question);

//Respuestas
router.get('/quizes/answer', quizController.answer);

module.exports = router;
