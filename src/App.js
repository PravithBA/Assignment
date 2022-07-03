import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-brands-svg-icons';
import { faCirclePlay, faPlusSquare, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import data from './data.json'
import axios from 'axios';
import Select from 'react-select'
import Popup from './components/Popup';

function App() {
document.title = 'Team Manager'
const [tasks,setTasks] = useState([])
const [newActive,setNewActive] = useState(false)
useEffect(()=>{
    async function getData(){
    }
    getData()
    setTasks(data.tasks)
},[])
useEffect(()=>{
},[tasks])
const editTask = (field,data,id)=>{
    const newTasks = tasks
    const reqTask = newTasks[id]
    reqTask[field] = data
    newTasks[id] = reqTask
    setTasks([...newTasks])
}
const duplicateTask = (id)=>{
    const newTasks = tasks
    const reqTask = {...newTasks[id]}
    newTasks.splice(id+1,0,reqTask)
    setTasks([...newTasks])
}
return (
    <>
    <div className="main">
        <div className='table'>
        <nav className="header">
            <h1>Sales log</h1>
            <button className='add-task-btn' onClick={()=>setNewActive(true)}>
                <FontAwesomeIcon icon={faSquarePlus} style={{fontSize:"1em"}} />
                Add New Task
            </button>
            <Popup setTasks={setTasks} tasks={tasks} active={newActive} setActive={setNewActive}/>
            <input className='search-bar' placeholder='Search ' />
        </nav>
        <div className="task-container">
            
            <div  className='task-c'>
            <div className='nav date'>Date</div>
            <div className='nav name'>Company Name</div>
            <div className='nav type'>Task type</div>
            <div className='nav time'>Time</div>
            <div className='nav cont'>Contact </div>
            <div className='nav note'>Notes</div>
            <div className='nav stat'>Status</div>
            <div className='nav opt' style={{cursor:'default'}}>Options</div>
            </div>
            {tasks.map((task, i)=>{
                return(
                <div key={i} className='task-c'>
                    <div className='date'>{task.date}</div>
                    <div className='name'>{task.company}</div>
                    <div className='type'>{task.type}</div>
                    <div className='time'>{task.time}</div>
                    <div className='cont'>{task.contact}</div>
                    <div className='note'>{task.notes}</div>
                    <div className='stat'>{task.status}</div>
                    <div className="tooltip-menu stat-menu">
                    <h5>Status</h5>
                    <button onClick={()=>{editTask("status",(task.status !== "Open")?"Open":"Closed",i)}}>{(task.status !== "Open")?"Open":"Close"}</button>
                    </div>
                    <button className='opt option'>Options
                    </button>
                    <div className='tooltip-menu opt-menu'>
                    <h5>Options</h5>
                    <button className='edit'>Edit</button>
                    <button className='dup' onClick={()=>{duplicateTask(i)}}>Duplicate</button>
                    <button className='change' onClick={()=>{editTask("status",(task.status !== "Open")?"Open":"Closed",i)}}>Change Status</button>
                    </div>
                </div>
                )
            })
            }
        </div>
        </div>
    </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
    </>
);
}

export default App;
