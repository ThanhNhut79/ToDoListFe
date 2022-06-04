import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"

const TodoForm = ({ addTask, userInput, setUserInput, value, setValue }) => {
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addTask(userInput, value)
  }
  return (
    <form className='my-form-control' onSubmit={handleSubmit}>
      <TextField
        placeholder='Enter task...'
        type='text'
        label='Enter task'
        value={userInput}
        onChange={handleChange}
        data-test='task'
      />
      <DatePicker
        label='Date'
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} data-test='date' />}
      />
      <Button
        type='submit'
        size='large'
        variant='contained'
        className='submit-btn'
      >
        Submit
      </Button>
    </form>
  )
}

export default TodoForm
