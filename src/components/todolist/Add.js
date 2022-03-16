import React, { useState } from 'react'
import '../../App.css'

export default function Add ({ handleAddTask, handleCancelBtn }) {
  const [newTask, setNewTask] = useState('')

  function addTask (e) {
    handleAddTask(e, newTask)
  }

  return (
    <form onSubmit={addTask}>
      <h1>Add New Task</h1>
      <label>Name</label>
      <br />
      <input
        name="tempTask"
        type="text"
        value={newTask}
        placeholder="Please enter the task name"
        onChange={(e) => setNewTask(e.target.value)}
      />
      <br />
      <button className="btn-form" type="submit">
        Add
      </button>
      <button
        className="btn-form  btn-cancel"
        type="button"
        onClick={handleCancelBtn}
      >
        Cancel
      </button>
    </form>
  )
}
