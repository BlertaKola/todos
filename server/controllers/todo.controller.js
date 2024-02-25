const Todo = require('../models/todo.model');   

module.exports.createTodo = (request, response) => {
    Todo.create(request.body) 
        .then(todo => response.json(todo))
        .catch(err => response.status(400).json(err));
}

module.exports.getTodos = (request, response) => {
    Todo.find()
        .then(todos => response.json(todos))
        .catch(err => response.json(err))
}
module.exports.changeTodoState = (request, response) => {
    Todo.findOne({_id:request.params.id})
        .then(todo => {
            todo.state = request.body.state
            todo.save()
            response.json(todo)
        })
}

module.exports.getTodo = (request, response) => {
    Todo.findOne({_id:request.params.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

module.exports.removeTodo = (request, response) => {
    Todo.deleteOne({_id: request.params.id})
        .then(res => console.log(res))
        .catch(err => console.log(err))
}