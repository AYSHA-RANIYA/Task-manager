import React, { useEffect, useState } from 'react'
import API from '../api'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [editingTask, setEditingTask] = useState(null) 
  const navigate = useNavigate()

  const fetchTasks = async () => {
    const { data } = await API.get('/tasks')
    setTasks(data)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

 return (
  <div style={{ maxWidth: "700px", margin: "30px auto" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>Dashboard</h2>
      
    </div>

    <TaskForm
      refresh={fetchTasks}
      editingTask={editingTask}
      setEditingTask={setEditingTask}
    />

    <TaskList
      tasks={tasks}
      refresh={fetchTasks}
      setEditingTask={setEditingTask}
    />

    <button onClick={logout}>Logout</button>
  </div>
)

}

export default Dashboard
