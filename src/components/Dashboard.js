import React from 'react'

function Dashboard({handleLogout}) {
  return (
    <div>
      <nav> 
        <h1>Welcome to Collabify</h1>
        <button onClick={handleLogout}>Logout</button>
      </nav> 
    </div>
  )
}

export default Dashboard
