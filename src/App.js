import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-brands-svg-icons';
import { faCirclePlay, faPlusSquare, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import data from './data.json'

function App() {
  document.title = 'Team Manager'
  const [tasks,setTasks] = useState({})
  useEffect(()=>{
    console.log()
  },[])
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

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
