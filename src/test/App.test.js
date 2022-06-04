import axios from "axios"
import renderer, { act } from "react-test-renderer"
import App from "../App"

const todoList = [
  {
    completed: false,
    task: "Give dog a bath",
    _id: "62986866968e18bbf3565d2e",
    date: "06/23/2022",
  },
  {
    completed: false,
    task: "Give dog a bath",
    _id: "62996bee1da17815189dabe0",
    date: "06/23/2022",
  },
]

jest.mock("axios")

describe("App component", () => {
  test("App test works", async () => {
    let tree
    axios.get.mockResolvedValue({ data: todoList })
    await act(async () => {
      tree = renderer.create(<App />)
    })
    expect(tree.toJSON()).toMatchSnapshot()
  })
})
