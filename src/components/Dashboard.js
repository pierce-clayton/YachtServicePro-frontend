import React from 'react'

export default function Dashboard({loggedInStatus, user, customer}) {
  return (
    <div>
      <h1>Dashboard</h1>
      {user === {} && <h2>Welcome Customer {customer.email}</h2>}
      {customer === {} && <h2>Welcome {user.email}</h2>}
      <h2>Status: {loggedInStatus}</h2>
    </div>
  )
}
