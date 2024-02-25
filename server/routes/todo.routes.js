const TodoController = require('../controllers/todo.controller')

module.exports = (app) => {
    app.post('/api/todos', TodoController.createTodo);     /* This is new */
    app.get('/api/todos', TodoController.getTodos)
    app.patch('/api/todos/:id', TodoController.changeTodoState)
    app.get('/api/todos/:id', TodoController.getTodo)
    app.delete('/api/todos/:id', TodoController.removeTodo)
} 