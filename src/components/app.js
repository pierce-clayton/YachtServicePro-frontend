import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home'
import Dashboard from './Dashboard'
import axios from 'axios'

export default class App extends Component {
  state = {
    loggedInStatus: 'NOT_LOGGED_IN',
    user: {},
    customer: {}
  }

  componentDidMount(){
    this.checkLoginStatus()
  }
  // 'https://gentle-caverns-38062.herokuapp.com/logged_in'
  checkLoginStatus = () => {
    axios.get('https://backend.baracus.rocks/logged_in', { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
        this.setState({ loggedInStatus: 'LOGGED_IN', user: response.data.user })
      }else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN', user: {} })
      }
    })
    .catch(err => console.log(err))
  }
  handleLogin = (data) => {
    if (data.user) {
      this.setState({loggedInStatus: "LOGGED_IN", user: data.user})
    }else {
      this.setState({loggedInStatus: "LOGGED_IN", customer: data.customer})
    }
  }
  handleLogout = () => {
    this.setState({ loggedInStatus: 'NOT_LOGGED_IN', user: {}})
  }
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={props => (
              <Home {...props}
                    handleLogin={this.handleLogin}
                    handleLogout={this.handleLogout}
                    loggedInStatus={this.state.loggedInStatus} />
            )} />
            <Route exact path='/dashboard' render={props => (
              <Dashboard {...props}
                         loggedInStatus={this.state.loggedInStatus}
                         user={this.state.user}
                         customer={this.state.customer}
                         />
            )}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
