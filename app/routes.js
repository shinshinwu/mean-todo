var Todo = require('./model/todo');
// var express = require

module.exports = function(app) {
  // RESTful Routes
console.log(app);

  app.get('/api/todos', function(req, res) {

      Todo.find(function(err, todos) {
          if (err)
              res.send(err)
          res.json(todos);
      });
  });

  app.post('/api/todos', function(req, res){

      // create todo
      Todo.create({
          text: req.body.text,
          done: false
      }, function(err, todo){
          if (err)
              res.send(err);

          // return all todos after creation
          Todo.find(function(err, todos){
              if (err)
                  res.send(err)
              res.json(todos);
          });
      });
  });

  // delete todo entry
  app.delete('/api/todos/:todo_id', function(req, res){
      Todo.remove({
          _id: req.params.todo_id
      }, function(err, todo){
          if (err)
              res.send(err);

          Todo.find(function(err, todos){
              if (err)
                  res.send(err)
              res.json(todos);
          });
      });
  });

  app.get('*', function(req, res){
      res.sendfile('./public/index.html');
  });

};