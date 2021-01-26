import React, { Component } from 'react'
import Price from '../components/Price'

export default class PriceContainer extends Component {
  render() {
    const { user, product , marinas, history } = this.props
    return (
      <div className='columns'>
        <Price user={user} product={product} marinas={marinas} history={history}/>
      </div>
    )
  }
}
