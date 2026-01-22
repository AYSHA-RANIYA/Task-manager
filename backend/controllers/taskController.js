const Task = require('../models/Task')

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body

    if (!title) {
      return res.status(400).json({ message:'Title is required'})
    }

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    })

    if (!task) {
      return res.status(404).json({ msg: "Task not found" })
    }

    res.json({message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

