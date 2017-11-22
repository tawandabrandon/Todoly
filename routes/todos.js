var express = require('express');
var Todo = require('./todo');
var router = express.Router();

var fromDatabase = [
  {
    "title": "Finish School Stuff",
    "dueDate": "18.11.2017",
    "complete": true
  },
  {
    "title": "Call Tusa",
    "dueDate": "23.11.2017",
    "complete": false
  },
  {
    "title": "22 Days of code",
    "dueDate": "22.12.2017",
    "complete": false
  }
]


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.json(fromDatabase);
})


router.get('/search/:searchTerm', function(req, res, next) {
    var searchTerm = req.param('searchTerm');
    db.con.connect(function(err) {
        db.con.query("SELECT * FROM todos WHERE title = '" + searchTerm + "' ", function(err, result) {
            if (err) {
                return {
                    'error': 'No Todo Found'
                };
            } else {
                searchResult = result;
                res.json(result);
            }
        })
    })
})

router.get('/delete/:title', function(req, res, next) {
    var delcomplete = req.params.title;
    deleteTodo(delcomplete);
    res.end('Deleted record');
})

router.get('/new/:title/:dueDate/:complete', function(req, res) {
    var todo = new Todo(req.params.title, req.params.dueDate, req.params.complete);
    newTodo(todo);
    res.end('Done');
});

function newTodo(todo){
	fromDatabase.push(todo);
	console.log(todo.title+' was added!');
}

module.exports = router