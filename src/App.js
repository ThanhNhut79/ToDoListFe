import React, { useState, useEffect } from "react"
import Header from "./Header"
import TodoList from "./TodoList"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import axios from "axios"
import moment from "moment"

const App = () => {
  const [todoList, setTodoList] = useState([])
  const [value, setValue] = useState(null)
  const [userInput, setUserInput] = useState("")

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        await axios
          .get("http://localhost:7000")
          .then((response) => setTodoList(response.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchTodo()
  }, [])

  const handleFilter = async () => {
    try {
      await axios
        .delete("http://localhost:7000")
        .then((response) => response.data)
        .then((data) => setTodoList(data))
    } catch (error) {
      console.log(error)
    }
  }

  const addTask = async (userInput, value) => {
    if (!value) return
    const date = moment(value).format("MM/DD/YYYY")
    try {
      await axios
        .post("http://localhost:7000", { task: userInput, date })
        .then((response) => response.data)
        .then((data) => {
          let copy = [...todoList]
          setTodoList([...copy, data.newTodo])
          setUserInput("")
          setValue(null)
        })
    } catch (error) {
      console.log(error)
    }
  }

  if (!todoList || todoList.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='App'>
        <Header />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          handleFilter={handleFilter}
          addTask={addTask}
          userInput={userInput}
          setUserInput={setUserInput}
          value={value}
          setValue={setValue}
        />
      </div>
    </LocalizationProvider>
  )
}

export default App
