import React from 'react'
import API from '../api'

const TaskList = ({ tasks, refresh, setEditingTask }) => {

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`)
    refresh()
  }

  return (
   <ul style={{ listStyle: "none", padding: 0 }}>
  {tasks.map(task => (
    <li
      key={task._id}
      style={{
        background: "Black",
        marginBottom: "10px",
        padding: "12px",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <div>
        <b>{task.title}</b>
        <p>{task.description}</p>
      </div>

      <div>
        <button onClick={() => setEditingTask(task)}>Edit</button>
        <button
          style={{ background: "#dc2626", marginLeft: "5px" }}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

    
  )
}

export default TaskList
