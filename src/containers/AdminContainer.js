import React, { Component } from 'react'
import MarinaProducts from '../components/MarinaProducts'
import ProductForm from '../components/ProductForm'
import axios from 'axios'
import {reactLocalStorage} from 'reactjs-localstorage'

export default class AdminContainer extends Component {

  state = {
    productList: [],
    productName: '',
    productDescription: ''
  }

  componentDidMount() {
    axios.get('https://backend.baracus.rocks/products.json', { withCredentials: true })
    .then(response => {
      this.setState({productList: [...response.data]})
      reactLocalStorage.setObject('productList', [...response.data])
      reactLocalStorage.remove('selectedProduct')
    })
  }
  componentWillUnmount(){
    reactLocalStorage.remove('productList')
  }
  handleNewProduct = (product) => {
    this.setState(prevState => ({
      productList: [...prevState.productList, product]
    }))
    reactLocalStorage.setObject('productList', [...this.state.productList, product])
  }
  
  render() {
    const { user, marinas, history } = this.props
    const marinaProductsList = marinas.map(marina => {
      return <MarinaProducts key={marina.id}
                             marina={marina}
                             user={user}
                             history={history} 
                             productList={this.state.productList.filter(product => product.marina_id === marina.id)}
                             handleSelectedProduct={this.props.handleSelectedProduct}
                           />
    })
    return (
      <div className='columns'>
        <ProductForm
         user={user}
         marinas={marinas}
         handleNewProduct={this.handleNewProduct}
        />
        {marinaProductsList}
      </div>
    )
  }
}
