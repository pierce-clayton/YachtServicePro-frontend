import React from 'react'
import YachtContainer from './YachtContainer'
import AdminContainer from './AdminContainer'

export default function Dashboard({loggedInStatus, user, customer, marinas, handleSelectedYacht, history, yacht, handleSelectedProduct}) {
  return (
    <div>
      {!!customer.email && loggedInStatus ==='LOGGED_IN' && <YachtContainer
                                                            yacht={yacht}
                                                            marinas={marinas}
                                                            customer={customer}
                                                            handleSelectedYacht={handleSelectedYacht}
                                                            history={history}
                                                            />}
      {!!user.email && loggedInStatus ==='LOGGED_IN' && <AdminContainer
                                                          user={user}
                                                          marinas={marinas}
                                                          history={history}
                                                          handleSelectedProduct={handleSelectedProduct}/>}
    </div>
  )
}
