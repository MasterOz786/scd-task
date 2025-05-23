import './App.css';
import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencil } from 'react-icons/bs';
import { formatDistanceToNow } from 'date-fns';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [updatetask, setUpdatetask] = useState('');
    const [taskid, setTaskid] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const edit = (id) => {
        axios.put(`http://localhost:5000/edit/${id}`)
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, done: !todo.done };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    const Update = (id, updatedTask) => {
        axios.put(`http://localhost:5000/update/${id}`, { task: updatedTask })
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.map(todo => {
                    if (todo._id === id) {
                        return { ...todo, task: updatedTask };
                    }
                    return todo;
                });
                setTodos(updatedTodos);
                setTaskid('');
                setUpdatetask('');
                Window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const Hdelete = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then(result => {
                console.log(result.data);
                const updatedTodos = todos.filter(todo => todo._id !== id);
                setTodos(updatedTodos);
            })
            .catch(err => console.log(err));
    };

    return (
        <main>
            <Create />
            {
                todos.length === 0 ? <div className='task'>No tasks found</div> :
                    todos.map((todo) => (
                        <div className='task' key={todo._id}>
                            <div className='checkbox'>
                                {todo.done ? <BsFillCheckCircleFill className='icon' /> :
                                    taskid === todo._id? <BsPencil className='icon' /> :
                                    <BsCircleFill className='icon' onClick={() => edit(todo._id)} />}
                                {taskid === todo._id ? (
                                    <input type='text' value={updatetask} onChange={e => setUpdatetask(e.target.value)} />
                                ) : (
                                    <div>
                                        <p className={todo.done ? 'through' : 'normal'}>{todo.task}</p>
                                        <small className="timestamp">
                                            {formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}
                                        </small>
                                    </div>
                                )}
                            </div>
                            <div>
                                <span>
                                {
                                    taskid === todo._id ? (
                                        <BsFillCheckCircleFill className='icon' onClick={() => Update(todo._id, updatetask)} />
                                    ) : (
                                        <BsPencil className='icon' onClick={() => {
                                            setTaskid(todo._id);
                                            setUpdatetask(todo.task);
                                        }} />
                                    )}
                                    <BsFillTrashFill
                                        className='icon'
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this task?')) {
                                            Hdelete(todo._id);
                                            }
                                        }}
                                        />
                                </span>
                            </div>
                        </div>
                    ))
            }
        </main>
    );
};

export default Home;
