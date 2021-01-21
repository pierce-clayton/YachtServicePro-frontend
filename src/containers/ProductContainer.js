import React, { Component } from 'react'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51I8VgBLQ8SRg06CGvE7ORHZK9TXklhMoJ1RGACj9PUgozDhU8IjjUaJWeczZM3SW6bVZSJC0vrhuzb5QDOohvLXd00YXy0xfa9');
import Product from '../components/Product'


export default class ProductContainer extends Component {
  state = {
    products: []
  }
  componentDidMount() {
    const { yacht } = this.props
    axios.get('https://backend.baracus.rocks/products.json', { withCredentials: true })
    .then(response => {
      this.setState({products: response.data.filter(product => product.marina_id === yacht.marina_id)})
    })
  }
  handlePurchase = (product, interval) => {
    console.log(product, interval)
  }
  
  render() {
    const { customer, yacht, marinas } = this.props
    return (
      <div>
        <Product
        customer={customer}
        yacht={yacht} marinas={marinas}
        products={this.state.products}
        handlePurchase={this.handlePurchase}
        />
      </div>
    )
  }
}
