import React, { Component } from 'react'
import Registration from '../components/auth/Registration'
import Login from '../components/auth/Login'
import CustomerRegistration from '../components/auth/CustomerRegistration'
import CustomerLogin from '../components/auth/CustomerLogin'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'

export default class Home extends Component {

  state = {
    user: reactLocalStorage.getObject('homeState') || true
  }

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
  handlePortalSwitching = () => {
    reactLocalStorage.setObject('homeState', this.state)
    this.setState({user: !this.state.user})
  }
  render() {
    return (        
        <div className="columns">
          <div className="button is-primary" onClick={() => this.handlePortalSwitching()}>{this.state.user ? "Customer Portal": "Provider Portal"}</div>
          {this.state.user && (!!this.props.user.email ? <div className="button is-primary" onClick={() => this.handleLogoutClick()}>Register New Provider</div> : <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />)}
          {this.state.user && (!!this.props.user.email ? <div className="button is-primary" onClick={() => this.props.history.push('/dashboard')}>View Products</div> : <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>) }
          {!this.state.user && (!!this.props.customer.email ? <div className="button is-primary" onClick={() => this.handleLogoutClick()}>Register New Customer</div> : <CustomerRegistration handleSuccessfulAuth={this.handleSuccessfulAuth} />)}
          {!this.state.user && (!!this.props.customer.email ? <div className="button is-primary" onClick={() => this.props.history.push('/dashboard')}>View Yachts</div> : <CustomerLogin handleSuccessfulAuth={this.handleSuccessfulAuth}/>) }
          
        </div>
    )
  }
}
