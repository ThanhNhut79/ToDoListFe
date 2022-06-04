import { fixture, Selector } from "testcafe"
import { addTodo } from "./testcafe/e2e"

fixture`Fixture import`.page("http://localhost:3000")

const todos = Selector(() => {
  return document.getElementsByClassName("todoTask")
})

test("should user see the todo", async (browser) => {
  await browser.expect(Selector('[data-test="todoTask"]').exists).ok()
})

test("should user toggle the todo item", async (browser) => {
  await browser.click(Selector('[data-test="todo-btn"]'))
  await browser
    .expect(Selector('[data-test="todoTask"]').classNames)
    .contains("done")
})

test("should user create a todo", async (browser) => {
  await addTodo({
    task: "Clean",
    date: "10/23/2022",
    browser,
  })
  if (todos.exists) {
    await browser
      .expect(todos.nth((await todos.count) - 1).innerText)
      .eql("CLEAN")
  }
})

test("should user delete completed todo", async (browser) => {
  let cnt = 0,
    len = await todos.count
  if (todos.exists) {
    for (let i = 0; i < (await todos.count); i++) {
      let cln = await todos.nth(i).classNames
      let flg = cln.findIndex((c) => c === "done")
      if (flg !== -1) {
        cnt++
      }
    }
  }
  await browser.click(Selector('[data-test="delete-btn"]'))
  await browser.expect(await todos.count).eql(len - cnt)
})
