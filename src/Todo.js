import React from "react"
import { Grid, Button, Typography } from "@mui/material"

const Todo = ({ todo, handleToggle }) => {
  return (
    <Grid item xs={6} md={4}>
      <Button
        className='todo-btn'
        variant='text'
        onClick={() => handleToggle(todo._id)}
        data-test='todo-btn'
      >
        <Typography
          variant='body1'
          className={`${todo.completed ? "done" : ""} todoTask`}
          data-test='todoTask'
        >
          {todo.task}
        </Typography>
      </Button>
      <Typography>End day: {todo.date}</Typography>
    </Grid>
  )
}

export default Todo
