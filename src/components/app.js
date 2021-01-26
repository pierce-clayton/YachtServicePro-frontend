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
    this.checkLoginStatus()
    axios.get('https://backend.baracus.rocks/marinas.json', { withCredentials: true })
    .then(response => {
      this.setState({marinas: response.data})
    })
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
    this.setState({ loggedInStatus: 'NOT_LOGGED_IN', user: {}})
    location.reload()
  }
  handleSelectedYacht = (yacht) => {
    this.setState({selectedYacht: yacht})
    reactLocalStorage.setObject('selectedYacht', yacht)
  }
  handleSelectedProduct = (product) => {
    this.setState({selectedProduct: product})
    reactLocalStorage.setObject('selectedProduct', product)
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
                                />
            )} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
