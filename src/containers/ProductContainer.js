import React, { Component } from 'react'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51I8VgBLQ8SRg06CGvE7ORHZK9TXklhMoJ1RGACj9PUgozDhU8IjjUaJWeczZM3SW6bVZSJC0vrhuzb5QDOohvLXd00YXy0xfa9');


export default class ProductContainer extends Component {
  render() {
    const { customer, yacht, marinas } = this.props
    return (
      <div>
        
      </div>
    )
  }
}
