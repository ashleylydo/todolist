import '../../App.css'

export default function DisplayItems ({
  name, index, handleDeleteTask, handleEditTask, handleEditBtn,
}) {
  function editTask () {
    handleEditBtn()
    handleEditTask(index, name)
  }

  return (
    <tr>
      <td>{name}</td>
      <td>
        <button className="btn-home" onClick={editTask}>Edit</button>
      </td>
      <td>
        <button className="btn-home" onClick={() => handleDeleteTask(name)}>Delete</button>
      </td>
    </tr>
  )
}
