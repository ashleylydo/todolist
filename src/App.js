import {useState} from "react";
import Add from "./components/Add";
import Edit from "./components/Edit";
import DisplayItems from "./components/DisplayItems";
import "./App.css";

export default function Home() {
    const [taskList, setTaskList] = useState(["TodoList Task"]);
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

    function handleEditTask(index, name) {
        setChosenTask(chosenTask => ({...chosenTask, ...{id: index, name: name}}))
    }

    function handleChanges(id, name) {
        let tempArr = [...taskList];
        tempArr[id] = name;
        setTaskList(tempArr);
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
                    handleChanges={handleChanges}
                />
            </div>
        );
    }

    return (
        <div>
            <br/>
            <br/>
            <button className = "btn-home" onClick={() => setChooseAdd(true)}>Add Task</button>
            <h2>List Task</h2>
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
                    taskList.map((name, index) => (
                        <DisplayItems
                            name={name}
                            handleEditBtn={handleEditBtn}
                            handleDeleteTask={handleDeleteTask}
                            index={index}
                            handleEditTask={handleEditTask}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
