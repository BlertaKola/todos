import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const Todo = (props) => {
    const {todos, setTodos} = props
    const [form, setForm] = useState({
        name: "",
        dueDate: "",
        state: "todo"
    })
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const isDuplicate = todos.some((todo) => todo.name === form.name)
        isDuplicate ? setErrors({name: {message : "Todo with this name already exists."}}) : axios.post('http://localhost:8000/api/todos', form)
            .then(res => navigate('/todos'))
            .catch(err => {
                if (err.response && err.response.data && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
                console.log("Error:", err);
            });
        
        
    }
    return (
        <>
        
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your todos name" />
                    {errors && errors.name && (
                        <div style={{ color: 'red' }}>{errors.name.message}</div>
                    )}
                    <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
                    {errors && errors.dueDate && (
                        <div style={{ color: 'red' }}>{errors.dueDate.message}</div>
                    )}
                </div>
                <input type="submit" value="Create Todo" />

            </form>

        </>
    )
}
export default Todo