import React, { useState, useEffect } from 'react'
import API from '../api'

const TaskForm = ({ refresh, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title)
      setDescription(editingTask.description)
    }
  }, [editingTask])

  const submitTask = async (e) => {
    e.preventDefault()

    if (editingTask) {
      await API.put(`/tasks/${editingTask._id}`, {
        title,
        description,
      })
      setEditingTask(null)
    } else {
      await API.post('/tasks', { title, description })
    }

    setTitle('')
    setDescription('')
    refresh()
  }

  return (
   <form onSubmit={submitTask}>
  <input
    placeholder="Title"
    value={title}
    onChange={e => setTitle(e.target.value)}
    required
  />

  <input
    placeholder="Description"
    value={description}
    onChange={e => setDescription(e.target.value)}
  />

  <button>
    {editingTask ? 'Update Task' : 'Add Task'}
  </button>
</form>

  )
}

export default TaskForm
