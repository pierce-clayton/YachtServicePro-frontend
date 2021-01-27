import React, { Component } from 'react'
import Price from '../components/Price'
import PriceForm from '../components/PriceForm'

export default class PriceContainer extends Component {
  render() {
    let { user, product, history, handleSelectedProduct } = this.props
    return (
      <div className='columns'>
        <PriceForm user={user} product={product}  history={history} handleSelectedProduct={handleSelectedProduct} />
        <Price user={user} product={product} history={history}/>
      </div>
    )
  }
}
