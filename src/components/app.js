import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../containers/Home'
import Dashboard from '../containers/Dashboard'
import ProductContainer from '../containers/ProductContainer'
import PriceContainer from '../containers/PriceContainer'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage'

export default class App extends Component {
  state = {
    loggedInStatus: 'NOT_LOGGED_IN',
    user: {},
    customer: {},
    marinas: [],
    selectedYacht: reactLocalStorage.getObject('selectedYacht') || {},
    selectedProduct: reactLocalStorage.getObject('selectedProduct') || {}
  }

  componentDidMount(){
    axios.get('https://backend.baracus.rocks/marinas.json', { withCredentials: true })
    .then(response => {
      this.setState({marinas: response.data})
      
    })
    this.checkLoginStatus()
    
   
  }
  componentWillUnmount(){
    reactLocalStorage.remove('selectedYacht')
    reactLocalStorage.remove('selectedProduct')
  }
  // 'https://gentle-caverns-38062.herokuapp.com/logged_in'
  checkLoginStatus = () => {
    axios.get('https://backend.baracus.rocks/logged_in', { withCredentials: true })
    .then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
        if (!!response.data.user) {
          this.setState({ loggedInStatus: 'LOGGED_IN', user: response.data.user })
        } else {
          this.setState({ loggedInStatus: 'LOGGED_IN', customer: response.data.customer })
        }
      }else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
        this.setState({ loggedInStatus: 'NOT_LOGGED_IN', user: {} })
      }
    })
    .catch(err => console.log(err))
  }
  handleLogin = (data) => {
    if (!!data.user) {
      this.setState({loggedInStatus: "LOGGED_IN", user: data.user})
    }else {
      this.setState({loggedInStatus: "LOGGED_IN", customer: data.customer})
    }
  }
  handleLogout = () => {
    axios.delete('https://backend.baracus.rocks/logout', {withCredentials: true})
    .then(response => {
      this.setState({ loggedInStatus: 'NOT_LOGGED_IN', user: {}})
      location.reload()
    })
  }
  handleSelectedYacht = (yacht) => {
    this.setState({selectedYacht: yacht})
    reactLocalStorage.setObject('selectedYacht', yacht)
  }
  handleClearYacht = () => {
    // this.setState({selectedYacht: {}})
    // reactLocalStorage.remove('selectedYacht')
  }
  handleSelectedProduct = (product) => {
    this.setState({selectedProduct: product})
    reactLocalStorage.setObject('selectedProduct', product)
  }
  render() {
    return (
      <div className="container app">
        <div className="hero-head">
            <div className="container">
              <div className="navbar-menu">
                <div className="navbar-start">
                  <h1 className="title">Yacht Service Pro&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                </div>
                <div className="navbar-end">
                  <button className="button is-danger" type='button' onClick={this.handleLogout}>Logout</button> 
                </div>
              </div>
            </div>
        </div>
        <div className="hero-body">
              <BrowserRouter>
                <Switch>
                  <Route exact path='/' render={props => (
                    <Home {...props}
                          handleLogin={this.handleLogin}
                          handleLogout={this.handleLogout}
                          loggedInStatus={this.state.loggedInStatus}
                          user={this.state.user}
                          customer={this.state.customer} />
                  )} />
                  <Route exact path='/dashboard' render={props => (
                    <Dashboard {...props}
                              loggedInStatus={this.state.loggedInStatus}
                              user={this.state.user}
                              customer={this.state.customer}
                              marinas={this.state.marinas}
                              yacht={this.state.selectedYacht}
                              handleSelectedYacht={this.handleSelectedYacht}
                              handleSelectedProduct={this.handleSelectedProduct}
                              />
                  )}/>
                  <Route exact path='/services' render={props => (
                    <ProductContainer {...props} 
                                      customer={this.state.customer}
                                      marinas={this.state.marinas}
                                      yacht={this.state.selectedYacht}
                                      />
                  )} />
                  <Route exact path='/prices' render={props => (
                    <PriceContainer {...props} 
                                      user={this.state.user}
                                      product={this.state.selectedProduct}
                                      marinas={this.state.marinas}
                                      handleSelectedProduct={this.handleSelectedProduct}
                                      />
                  )} />
                </Switch>
              </BrowserRouter>
            </div>
        <div className="hero-foot">
            <div className="container has-text-centered">
              <h2>{this.state.loggedInStatus === 'LOGGED_IN' ? 'Logged In': 'Not Logged In'}</h2>
            </div>
        </div>
    </div>
    );
  }
}
