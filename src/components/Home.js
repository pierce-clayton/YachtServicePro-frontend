import React, { Component } from 'react'
import Registration from './auth/Registration'
import Login from './auth/Login'
import CustomerRegistration from './auth/CustomerRegistration'
import CustomerLogin from './auth/CustomerLogin'
import axios from 'axios'

export default class Home extends Component {

  handleSuccessfulAuth = (data) => {
    this.props.handleLogin(data)
    this.props.history.push('/dashboard')
  }
  handleLogoutClick = () => {
    axios.delete('https://backend.baracus.rocks/logout', {withCredentials: true})
    .then(() => {
      this.props.handleLogout()
    })
    .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h2>Status: {this.props.loggedInStatus}</h2>
        <button type='button' onClick={this.handleLogoutClick}>Logout</button> 
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
        <p>------------------------------------------------------------</p>
        <CustomerRegistration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <CustomerLogin handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    )
  }
}
