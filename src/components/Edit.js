import React, {useState} from "react";
import "../App.css";

export default function Edit({chosenTask, handleChanges, handleCancelBtn}) {
    const [newName, setNewName] = useState(chosenTask);

    function handleNewName() {
        if (newName.name !== ""){
            handleChanges(newName.id, newName.name);
            handleCancelBtn();
        }
    }


    return (
        <form onSubmit={handleNewName}>
            <h1>Edit Task</h1>
            <label>Task Name</label>
            <br/>
            <input
                type="text"
                placeholder="Please enter new task name"
                defaultValue={newName.name}
                onChange={(e) => setNewName({id: chosenTask.id, name: e.target.value})}
            />
            <br/>
            <button className="btn-form" type="submit">Edit Task</button>
            <button className="btn-form btn-cancel" type="button" onClick={handleCancelBtn}>Cancel</button>
        </form>
    );
}
