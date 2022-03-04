import {useState} from "react";
import Add from "./components/Add";
import Edit from "./components/Edit";
import DisplayItems from "./components/DisplayItems";
import "./App.css";

export default function Home() {
    const [taskList, setTaskList] = useState(["Todolist Task"]);
    const [chooseEdit, setChooseEdit] = useState(false);
    const [chooseAdd, setChooseAdd] = useState(false);
    const [chosenTask, setChosenTask] = useState({id: -1, name: ""});

    function handleCancelBtn() {
        setChooseEdit(false);
        setChooseAdd(false);
    }

    function handleAddTask(e, newTask) {
        e.preventDefault();

        if (newTask !== "") {
            setTaskList([...taskList, newTask]);
            handleCancelBtn();
        }
    }

    function handleDeleteTask(name) {
        const removeItem = taskList.filter((task) => {
            return task !== name;
        });
        setTaskList(removeItem);
    }

    function handleEditBtn() {
        setChooseEdit(true);
    }

    function handleEditTask(key, name) {
        setChosenTask(chosenTask => ({...chosenTask, ...{id: key, name: name}}))
        console.log(chosenTask);
    }

    function handleNameChange(id, name) {
        let tempArr = [...taskList];

        tempArr[id] = name;
        setTaskList(tempArr);
        console.log(tempArr);
    }

    if (chooseAdd) {
        return (
            <div>
                <Add
                    handleAddTask={handleAddTask}
                    handleCancelBtn={handleCancelBtn}
                />
            </div>
        );
    }

    if (chooseEdit) {
        return (
            <div>
                <Edit
                    chosenTask={chosenTask}
                    handleCancelBtn={handleCancelBtn}
                    handleNameChange={handleNameChange}/>
            </div>
        );
    }

    return (
        <div>
            <br/>
            <br/>
            <button className="btn-home"
                onClick={() => setChooseAdd(true)}>
                Add Task
            </button>

            <h1>List Task</h1>
            <table>
                <thead>
                <tr>
                    <th>Name of task</th>
                    <th>Edit Task</th>
                    <th>Delete Task</th>
                </tr>
                </thead>
                <tbody>
                {
                    taskList.map((name, key) => (
                        <DisplayItems
                            name={name}
                            handleEditBtn={handleEditBtn}
                            handleEditTask={handleEditTask}
                            handleDeleteTask={handleDeleteTask}
                            key={key}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}