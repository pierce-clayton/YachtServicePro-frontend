import React, { Component } from 'react'
import MarinaProducts from '../components/MarinaProducts'
import ProductForm from '../components/ProductForm'
import axios from 'axios'

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
    })
  }
  handleNewProduct = (product) => {
    this.setState(prevState => ({
      productList: [...prevState.productList, product]
    }))
  }
  handleDeleteProduct = (product) => {
    
  }
  render() {
    const { user, marinas, history } = this.props
    const marinaProductsList = marinas.map(marina => {
      return <MarinaProducts key={marina.id}
                             marina={marina}
                             user={user}
                             history={history} 
                             productList={this.state.productList.filter(product => product.marina_id === marina.id)}
                             handleSelectedProduct={this.props.handleSelectedProduct}/>
    })
    return (
      <div className='columns'>
        <ProductForm
         user={user}
         marinas={marinas}
         productName={this.state.productName}
         productDescription={this.state.productDescription}
         handleNewProduct={this.handleNewProduct}
        />
        {marinaProductsList}
      </div>
    )
  }
}
