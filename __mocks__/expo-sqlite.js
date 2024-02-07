let todos = []
let currentId = 0
const openDatabase = jest.fn().mockReturnValue({
  transaction: jest.fn((callback) => {
    callback({
      executeSql: (sql, params, successCallback, errorCallback) => {
        if (sql.startsWith('CREATE TABLE')) {
          successCallback()
        } else if (sql.startsWith('SELECT * FROM todos')) {
          successCallback(null, { rows: { _array: todos } })
        } else if (sql.startsWith('INSERT INTO todos')) {
          console.log(currentId)
          const newTodo = {
            id: ++currentId,
            title: params[0],
            done: params[1],
            created_at: params[2],
          }
          todos.push(newTodo)
          successCallback(null, { insertId: newTodo.id, rowsAffected: 1 })
        } else if (sql.startsWith('UPDATE todos')) {
          const [newTitle, id] = params
          const todoIndex = todosArray.findIndex((todo) => todo.id === id)
          if (todoIndex > -1) {
            todosArray[todoIndex].title = newTitle
            successCallback(null, { rowsAffected: 1 })
          } else {
            errorCallback('Todo not found')
          }
        }
      },
    })
  }),
})

const resetDatabase = () => {
  console.log('first')
  todosArray = []
  currentId = 0
}

export { openDatabase, resetDatabase }
