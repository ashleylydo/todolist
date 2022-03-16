import React, { useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import DisplayItems from './DisplayItems'
import '../../App.css'
import { Link } from 'react-router-dom'

export default function TodoList () {
  const [taskList, setTaskList] = useState(['TodoList Task'])
  const [chooseEdit, setChooseEdit] = useState(false)
  const [chooseAdd, setChooseAdd] = useState(false)
  const [chosenTask, setChosenTask] = useState({ id: -1, name: '' })

  function handleCancelBtn () {
    setChooseEdit(false)
    setChooseAdd(false)
  }

  function handleAddTask (e, newTask) {
    e.preventDefault()

    if (newTask !== '') {
      setTaskList([...taskList, newTask])
      handleCancelBtn()
    }
  }

  function handleDeleteTask (name) {
    const removeItem = taskList.filter((task) => task !== name)
    setTaskList(removeItem)
  }

  function handleEditBtn () {
    setChooseEdit(true)
  }

  function handleEditTask (index, name) {
    setChosenTask((chosenTask) => ({ ...chosenTask, ...{ id: index, name } }))
  }

  function handleChanges (id, name) {
    const tempArr = [...taskList]
    tempArr[id] = name
    setTaskList(tempArr)
  }

  if (chooseAdd) {
    return (
      <div>
        <Add handleAddTask={handleAddTask} handleCancelBtn={handleCancelBtn} />
      </div>
    )
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
    )
  }

  return (
    <div className="todolist">
      <br />
      <br />
      <button className="tdl-btn-home" onClick={() => setChooseAdd(true)}>
        Add Task
      </button>

      <Link to="/">
        <button className="tdl-btn-home">Go Back</button>
      </Link>

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
        {taskList.map((name, index) => (
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
  )
}
