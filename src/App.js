import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  } from '@fortawesome/free-brands-svg-icons';
import { faCirclePlay, faFileText, faPlusSquare, faSquarePlus, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import data from './data.json'
import axios from 'axios';
import Select from 'react-select'
import Popup from './components/Popup';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function App() {
document.title = 'Team Manager'
const [tasks,setTasks] = useState((data.tasks)?data.tasks:{})
const [filteredTasks,setFilteredTasks] = useState((data.tasks)?data.tasks:{})
const [newActive,setNewActive] = useState(false)
const [mobActive,setMobActive] = useState(-1)
const [filters,setFilters] = useState({orderBy:"date",dir:"asc",filters:['Meeting','Call','Call','Call']})
useEffect(()=>{
    async function getData(){
        setTasks(data.tasks)
        setFilteredTasks(data.tasks)
    }
    getData()
    filter()
},[])
useEffect(()=>{
    filter()
},[filters])
useEffect(()=>{},[filteredTasks])
const editTask = (field,data,id)=>{
    const newTasks = filteredTasks
    const reqTask = newTasks[id]
    reqTask[field] = data
    newTasks[id] = reqTask
    setTasks([...newTasks])
}
const duplicateTask = (id)=>{
    const newTasks = filteredTasks
    const reqTask = {...newTasks[id]}
    newTasks.splice(id+1,0,reqTask)
    setTasks([...newTasks])
}
const filter = ()=>{
    if(!tasks[0])
        return 
    let currTasks = [...tasks]
    function condition(a,b){
        if(!a,!b)
            return true
        let cond
        let date1 = a.date
        let date2 = b.date
        let comp1 = a.company
        let comp2 = b.company
        switch (true) {
            case (filters.orderBy === 'date' && filters.dir === "desc"):
                date1 = date1.split("/")
                date2 = date2.split("/")
                if(!(date1.length === date2.length && date1.length === 3))
                    return 0
                if((date1.every((date,i)=> Number(date) === NaN && Number(date2[i]) === NaN)))
                    return 0
                return (date1[2] > date2[2] || date1[1] > date2[1] || date1[0] > date2[0])?1:-1
            case (filters.orderBy === 'date' && filters.dir === "asc"):cond = (a.date < b.date)
                date1 = date1.split("/")
                date2 = date2.split("/")
                if(!(date1.length === date2.length && date1.length === 3))
                    return 0
                if((date1.every((date,i)=> Number(date) === NaN && Number(date2[i]) === NaN)))
                    return 0
                return (date1[2] < date2[2] || date1[1] < date2[1] || date1[0] < date2[0])?1:-1
            case (filters.orderBy === 'name' && filters.dir === "desc"):
                return comp1.localeCompare(comp2)
            case (filters.orderBy === 'name' && filters.dir === "asc"):
                return comp2.localeCompare(comp1)
            default:
                break;
        }
        return 0
    }
    if(filters.filters[0])
        currTasks = currTasks.filter(task=>filters.filters.includes(task.type))
    let newTasks = currTasks.sort((a,b)=>condition(a,b))
    setFilteredTasks([...newTasks])
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
            <Popup setTasks={setFilteredTasks} tasks={filteredTasks} active={newActive} setActive={setNewActive}/>
            <input className='search-bar' placeholder='Search ' />
        </nav>
        <div className="task-container">
            <div className='filter-container'>
                <div style={{fontSize:"0.4em"}}>
                    <FontAwesomeIcon style={{fontSize:"1em",marginTop:"0.7em"}} icon={faFilter}/>
                </div>
                {filters.filters.map((filter,i)=>{
                    return <div key={i} style={{display:"grid",placeItems:"center",gridAutoFlow:"column",gap:"0.2em"}} onClick={()=>{
                        let newFilter = [...filters.filters]
                        newFilter.splice(i,1)
                        setFilters({...newFilter,filters:[...newFilter]})
                    }} className='filter'>{filter}<FontAwesomeIcon style={{fontSize:"0.8em"}}icon={faXmarkCircle}/></div>
                })}
            </div>
            <div className='task-c'>
                <div style={{cursor:'pointer'}} onClick={()=>{setFilters({...filters,orderBy:"date",dir:(filters.dir === 'asc')?"desc":"asc"})}} className='nav date'>Date</div>
                <div style={{cursor:'pointer'}} onClick={()=>{setFilters({...filters,orderBy:"name",dir:(filters.dir === 'asc')?"desc":"asc"})}} className='nav name'>Company Name</div>
                <div style={{cursor:'pointer'}} type="task" className='nav type'>Task type
                <div className="tooltip-menu task-tooltip">
                    <h5>Choose Task</h5>
                    {["Call","Meeting","Video Call"].map((f,i)=>{
                        if(!filters.filters.includes(f))
                        return <button key={i} onClick={()=>{
                            let tempFilters = {...filters}
                            tempFilters['filters'] = [...filters.filters,f]
                            setFilters({...tempFilters})
                        }}>{f}</button>
                    })}
                </div>
                </div>
                <div style={{cursor:'pointer'}} className='nav time'>Time</div>
                <div style={{cursor:'pointer'}} className='nav cont'>Contact </div>
                <div style={{cursor:'pointer'}} className='nav note'>Notes</div>
                <div style={{cursor:'pointer'}} className='nav stat'>Status</div>
                <div style={{cursor:'pointer'}} className='nav opt'>Options</div>
            </div>
            {(filteredTasks[0])?"":<h1 style={{textAlign:"center",fontSize:"0.6em",padding:"1em 0.5em 0 0",color:"red"}}>No Tasks Available</h1>}
            {filteredTasks.map((task, i)=>{
                return(
                <div key={i} type="tasks" className={`task-c ${(mobActive === i)?"mob-active":""}`}>
                    <FontAwesomeIcon className={(newActive)?"open-not-btn":"open-btn"} icon={(mobActive !== i)?faCirclePlay:faXmarkCircle} onClick={()=>setMobActive((mobActive === i)?-1:i)}/>
                    <div className='date'>{task.date}</div>
                    <div className='name'>{task.company}</div>
                    <div className='type'>{task.type}</div>
                    <div className='time'>{task.time}</div>
                    <div className='cont'>{task.contact}</div>
                    <div className='note'>{task.notes}</div>
                    <div className='stat stat-mobile' onClick={()=>{
                        let tempTasks = [...filteredTasks]
                        let newTask = {...tempTasks[i]}
                        newTask['status'] = (newTask['status'] === "Open")?"Closed":"Open"
                        tempTasks[i] = {...newTask}
                        setFilteredTasks([...tempTasks])
                    }}>{task.status}</div>
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
