import React from 'react'
import YachtContainer from './YachtContainer'

export default function Dashboard({loggedInStatus, user, customer}) {
  return (
    <div>
      <h1>Dashboard</h1>
      {!!customer.email && loggedInStatus === 'LOGGED_IN' && <YachtContainer customer={customer}/>}
      {!!user.email && <h2>Welcome {user.email}</h2>}
      <h2>Status: {loggedInStatus}</h2>
    </div>
  )
}
