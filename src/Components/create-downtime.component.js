import React, { useState } from 'react';


const DownTime = () => {
    const [inputTask, setInputTask] = useState("");
    const handleInputChange = (event) => {
        setInputTask(event.target.value);
    }; 
    return (
    <div className="Todo">
        <h1>Downtimes</h1>
        <div className="Top">
        <input className="input" type="text" value={inputTask}
           onChange={handleInputChange} placeholder="Enter a task" />
            <button className="btn">ADD</button>
        </div>
    </div>
    );
};

export default DownTime; 