import React, { Component } from 'react'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = window.Stripe('pk_test_51I8VgBLQ8SRg06CGvE7ORHZK9TXklhMoJ1RGACj9PUgozDhU8IjjUaJWeczZM3SW6bVZSJC0vrhuzb5QDOohvLXd00YXy0xfa9');
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
    const price_obj = product.prices.filter(price => price.stripe_type === interval).pop()
    axios.post('https://backend.baracus.rocks/checkout_sessions.json',{
      price_id: price_obj.stripe_id,
      customer_id: this.props.customer.stripe_id,
      success_url: 'https://ysp.baracus.rocks/dashboard',
      cancel_url: 'https://ysp.baracus.rocks/',
      stripe_mode: interval === 'one_time' ? 'payment' : 'subscription'

    }, {withCredentials: true})
    .then(response => {
      return stripePromise.redirectToCheckout({sessionId: response.data.stripe_id})
    })
    console.log(stripePromise)
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
