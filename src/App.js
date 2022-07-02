import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-brands-svg-icons';
import { faCirclePlay, faPlusSquare, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import data from './data.json'

function App() {
  document.title = 'Team Manager'
  const [tasks,setTasks] = useState([])
  useEffect(()=>{
    setTasks(data.tasks)
  },[])
  useEffect(()=>{
    console.log(tasks)
  },[tasks])
  const addTask = ()=>{
  }
  return (
    <>
      <div className="main">
        <div className='table'>
          <nav className="header">
            <h1>Sales log</h1>
            <button className='add-task-btn'>
              <FontAwesomeIcon icon={faSquarePlus} style={{fontSize:"1em"}} />
              Add New Task
            </button>
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
            {tasks.map(task=>{
                return(
                  <div key={task.id} className='task-c'>
                    <div className='date'>{task.date}</div>
                    <div className='name'>{task.company}</div>
                    <div className='type'>{task.type}</div>
                    <div className='time'>{task.time}</div>
                    <div className='cont'>{task.contact}</div>
                    <div className='note'>{task.notes}</div>
                    <div className='stat'>{task.status}</div>
                    <button className='opt option'>Options
                    </button>
                    <div className='option-menu'>
                      <h5>Options</h5>
                      <button className='edit'>Edit</button>
                      <button className='dup'>Duplicate</button>
                      <button className='change'>Change Status</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
