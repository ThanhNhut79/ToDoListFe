import React from "react"
import { Paper, Grid, Stack, Button } from "@mui/material"
import Todo from "./Todo"
import TodoForm from "./TodoForm"
import axios from "axios"

const TodoList = ({
  todoList,
  setTodoList,
  handleFilter,
  addTask,
  userInput,
  setUserInput,
  value,
  setValue,
}) => {
  const handleToggle = async (id) => {
    try {
      await axios
        .patch(`http://localhost:7000/${id}`)
        .then((response) => response.data)
        .then((data) => {
          console.log(data)
          let mapped = todoList.map((task) =>
            task._id === id ? data.updatedTodo : task
          )
          setTodoList(mapped)
        })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Paper className='paper' elevation={6}>
      <Grid container spacing={4}>
        {todoList.map((todo) => {
          return (
            <Todo
              key={todo._id}
              todo={todo}
              handleToggle={handleToggle}
              handleFilter={handleFilter}
            />
          )
        })}
      </Grid>
      <Stack>
        <TodoForm
          addTask={addTask}
          userInput={userInput}
          setUserInput={setUserInput}
          value={value}
          setValue={setValue}
        />
        <Button
          variant='contained'
          style={{ marginTop: "10px" }}
          onClick={handleFilter}
          data-test='delete-btn'
        >
          Clear Complete
        </Button>
      </Stack>
    </Paper>
  )
}

export default TodoList
