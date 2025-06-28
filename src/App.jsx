import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import './index.css';
import { MdOutlineDoneOutline } from "react-icons/md";
import { MdNotificationImportant } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

const App = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Edit project video1', isDone: true, isImportant: false },
        { id: 2, title: 'Edit project video2', isDone: false, isImportant: false },
        { id: 3, title: 'Edit project video3', isDone: true, isImportant: false },
        { id: 4, title: 'Edit project video4', isDone: false, isImportant: false },
    ]);
    const [status, setStatus] = useState('ALL');

    const addTask = (e) => {
        e.preventDefault();
        let title = e.target[0].value.trim();

        if (!title) return;

        let find = tasks.find(item => item.title === title);
        if (find) {
            alert('Такая задача уже существует!');
        } else {
            setTasks(prev => [...prev, {
                id: uuidv4(),
                title,
                isDone: false,
                isImportant: false
            }]);
            e.target[0].value = '';
        }
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(item => item.id !== id));
    };

    const deleteAll = () => {
        setTasks([]);
    };

    const doneTask = (id) => {
        setTasks(prev => prev.map(item =>
            item.id === id ? { ...item, isDone: !item.isDone } : item
        ));
    };

    const importantTask = (id) => {
        setTasks(prev => prev.map(item =>
            item.id === id ? { ...item, isImportant: !item.isImportant } : item
        ));
    };

    const filteredTasks = tasks.filter(item => {
        if (status === 'Done') return item.isDone;
        if (status === 'Important') return item.isImportant;
        return true;
    });

    return (
        <div className='content'>
            <div className='todo'>
                <h1 className="title">TodoList</h1>
                <form onSubmit={addTask} className='form'>
                    <input placeholder='Add your task' className='form-input' type="text" />
                    <button type='submit' className='form-btn'>Add</button>
                </form>

                <div className="tasks-item-btns">
                    <button onClick={() => setStatus('ALL')} className={`tasks-status ${status === 'ALL' ? 'active' : ''}`}>All</button>
                    <button onClick={() => setStatus('Done')} className={`tasks-status ${status === 'Done' ? 'active' : ''}`}>Done</button>
                    <button onClick={() => setStatus('Important')} className={`tasks-status ${status === 'Important' ? 'active' : ''}`}>Important</button>
                </div>

                <ul className='tasks'>
                    {filteredTasks.map(item => (
                        <li key={item.id} className="tasks-item">
              <span
                  className={`tasks-item-text ${item.isDone ? 'done' : ''} ${item.isImportant ? 'important' : ''}`}
              >
                {item.title}
              </span>
                            <div className='tasks-item-btns'>
                                <button onClick={() => doneTask(item.id)} className={`tasks-item-btn ${item.isDone ? 'active' : ''}`}>
                                    <MdOutlineDoneOutline />
                                </button>
                                <button onClick={() => importantTask(item.id)} className={`tasks-item-btn ${item.isImportant ? 'active' : ''}`}>
                                    <MdNotificationImportant />
                                </button>
                                <button onClick={() => deleteTask(item.id)} type='button' className="tasks-item-btn">
                                    <RiDeleteBin6Fill />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {status === 'Done' && !tasks.some(item => item.isDone) && (
                    <h2>Здесь будут ваши законченные задачи</h2>
                )}
                {status === 'Important' && !tasks.some(item => item.isImportant) && (
                    <h2>Здесь будут ваши важные задачи</h2>
                )}
                {status === 'ALL' && tasks.length === 0 && (
                    <h2 >Здесь будут ваши задачи</h2>
                )}

                <div className='end'>
                    <span className='end-count'>{tasks.length} tasks</span>
                    <button onClick={deleteAll} type='button' className="end-btn">Delete All</button>
                </div>
            </div>
        </div>
    );
};

export default App;
