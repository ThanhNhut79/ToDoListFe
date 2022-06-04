export const addTodo = async ({ task, date, browser }) => {
  await browser.typeText('[data-test="task"]', task)
  await browser.typeText('[data-test="date"]', date)
  await browser.click("button[type=submit]")
}
