import React, { Component } from 'react'
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
import CustomerRegistration from '../components/auth/CustomerRegistration'
import CustomerLogin from '../components/auth/CustomerLogin'
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
      <div className="container">
        <section className="hero is-dark is-fullheight">
          <div className="hero-head">
              <div className="container has-text-centered">
                <h1>Home</h1>
                <button className="button is-danger" type='button' onClick={this.handleLogoutClick}>Logout</button> 
              </div>
          </div>
          <div className="hero-body">
              <div className="container">
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                      </div>
                    <div className="level-item">
                      <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    </div>
                  </div>
                  
                  <div className="level-right">
                    <div className="level-item">
                      <CustomerRegistration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </div>
                    <div className="level-item">
                      <CustomerLogin handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </div>
                  </div>
                </nav>
              </div>
          </div>
          <div className="hero-foot">
              <div className="container has-text-centered">
                <h2>Status: {this.props.loggedInStatus}</h2>
              </div>
          </div>
        </section>
      </div>
    )
  }
}
