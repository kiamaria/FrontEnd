
function TodoTable({ todos, del }) {

    return (
    <table>
    <thead>
        <tr>
            <th>Description</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
      {todos.map((todo, index) => (
        <tr key={index}>
          <td>{todo.desc}</td>
          <td>{todo.date}</td>
          <td>
          <button onClick={() => del(index)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default TodoTable
