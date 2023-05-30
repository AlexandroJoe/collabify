import React from 'react'
import TodoList from './TodoList'

function Dashboard({handleLogout}) {
  return (
    <div>
      <nav> 
        <h1>Welcome to Collabify</h1>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <TodoList/> 
    </div>
  )
}

export default Dashboard