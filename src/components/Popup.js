import React, { useState } from 'react';
import Select from 'react-select';

const Popup = ({ setTasks, tasks, active, setActive }) => {
const [err,setErr] = useState('')
const [selectV,setSelectV] = useState('')
const addTask = (e)=>{
    e.preventDefault()
    let elements = Array.from(e.target.elements)
    if(!elements.every(element=> {
        if(!(element.tagName === "INPUT"))
            return true
        else if(element.value !== '' || element.id.startsWith("react-select"))
            return true
        else
            return false
    }))
        return setErr("All fields not filled properly")
    let newTask = {
    date:"",
    company:"Otnem Pvt Ltd",
    type:"Call",
    time:"",
    contact:"Pravith B A",
    notes:"This is an awesome task.",
    status:"Open"
    }
    elements.forEach(element=>{
        if(element.getAttribute('name') === 'select')
            newTask['type'] = selectV
        else if((element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') && (element.name !== '' && element))
            newTask[element.name] = element.value
    })
    let newTasks = [...tasks]
    newTasks.push(newTask)
    setTasks([...newTasks])
    setActive(false)
}
const customStyles = {
    option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    fontSize:"0.6em"
    }),
    control: (provided) => ({
    ...provided,
    background:'rgb(40,40,40)',
    display:"flex",
    fontSize:"0.1em",
    border:"none"
    }),
    singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 1 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition, color:"white", border:"none" };
    }
}
function customTheme(theme){
    return{
    ...theme,
    colors:{
        ...theme.colors,
        primary25:"rgba(0,0,0,.2)",
        primary:"rgba(0,0,0,.7)",
        primary75:"rgba(0,0,0,.7)",
        primary50:"rgba(0,0,0,.5)",
    }
    }
}
const options = [{label:"Call",value:"Call"},{label:"Message",value:"Message"}]
const handleChange = e=>{
    setSelectV(e.value)
}
return (
    <>
    <div className={`task-menu ${(active)?"active":""}`} onClick={()=>setActive(false)}>
    </div>
    <form className={(active)?"active":""} onSubmit={(e)=>{addTask(e)}}>
        <nav>New Task</nav>
        <div className='val-c' >
            <input placeholder='Entry Name' name='contact'/>
            <div className='date-time'>
                <input type="text" placeholder='Date' name='date'/>
                <input type="time" name='time'/>
            </div>
            <div className='select-div'>
                <Select onChange={handleChange} theme={customTheme} styles={customStyles} name="select" options={options} />
            </div>
            <input placeholder='Company' name='company'/>
            <textarea placeholder='Notes (optional)' name='notes' rows={6} style={{resize:"none"}}/>
            <div className='form-btn'>
                <button type='button' onClick={()=>setActive(false)}>CANCEL</button>
                <button type='submit'>SAVE</button>
            </div>
        </div>
    </form>
    </>
);
};

export default Popup;