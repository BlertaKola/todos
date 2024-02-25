import axios from "axios"
import { useEffect, useState } from "react"
import './Todos.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Todo from "./Todo";

const Todos = () => {
    const [todos, setTodos] = useState([])
    const [update, setUpdate] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/todos')
            .then(res => {
                setTodos(res.data)
                setUpdate(!update)

            })
            .catch(err => console.log(err))
    }, [update])
    const changeState = (id, state) => {
        // e.preventDefault()
        console.log(state)
        console.log(id)
        axios.patch('http://localhost:8000/api/todos/' + id, { state: state })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const parseDueDate = (dueDate) => {
        const dateObject = new Date(dueDate);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        return { day, month, year };
      };

      const removeTodo =(id)=>{
        console.log(id)
        axios.delete('http://localhost:8000/api/todos/' + id)
            .then(res => {
                console.log(res)
                setTodos(todos.filter(todo => todo._id !== id))
            })
      }

    return (
        <>
            <Popup trigger={<button>Add Todo</button>} position="right center">
                <Todo todos={todos} setTodos={setTodos}/>
            </Popup>
            
            <div className="container">
                <div className="column">
                    <h1>Todos</h1>
                    {todos.filter(e => e.state === 'todo').sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((todo, index) => {
                        return (
                            <div key={index} className="card">{todo.name} {parseDueDate(todo.dueDate).day}/{parseDueDate(todo.dueDate).month}/{parseDueDate(todo.dueDate).year} {todo.state} <button onClick={() => changeState(todo._id, "working")}>Start working on this todo</button></div>
                        )
                    })}
                </div>
                <div className="column">
                    <h1>Working</h1>
                    {todos.filter(e => e.state === 'working').map((todo, index) => {
                        return (
                            <div key={index} className="card">{todo.name} {parseDueDate(todo.dueDate).day}/{parseDueDate(todo.dueDate).month}/{parseDueDate(todo.dueDate).year} {todo.state} <button onClick={() => changeState(todo._id, "finish")}>Finish this todo</button></div>
                        )
                    })}
                </div>
                <div className="column">
                    <h1>Done</h1>
                    {todos.filter(e => e.state === 'finish').map((todo, index) => {
                        return (
                            <div key={index} className="card">{todo.name} {parseDueDate(todo.dueDate).day}/{parseDueDate(todo.dueDate).month}/{parseDueDate(todo.dueDate).year} {todo.state}
                            <button onClick={() => removeTodo(todo._id)}>
                                Delete

                            </button></div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
export default Todos