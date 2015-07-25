var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

/*  GET author */
router.get('/author', function(req, res){
	res.render('author', { nombre: 'Eugenio J. Caicedo H.', errors: [] });
});

/* Routes Session */
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.delete('/logout', sessionController.destroy);

/* GET quizes*/
//Auto-Load
router.param('quizId', quizController.load);

//Lista Preguntas
router.get('/quizes', quizController.index);

//Buscar
router.get('/find', quizController.find);

// Pregunta
router.get('/quizes/:quizId(\\d+)', quizController.show);

router.get('/quizes/new', sessionController.loginRequired, quizController.new);

router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);

router.post('/quizes/create', sessionController.loginRequired, quizController.create);

router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);

router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

//Comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

//Respuesta
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
