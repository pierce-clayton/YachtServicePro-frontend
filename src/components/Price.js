import React, { Component } from 'react'

export default class Price extends Component {
  priceList = this.props.product.prices.map(price => {
    return <article className="media" key={price.id}>
    <div className="media-content">
      <div className="content">
        <p>Product Name: {this.props.product.name}</p><br/>
        <p>Type: {price.stripe_type}</p><br/>
        <p>Price: ${parseInt(price.unit_amount) * .01}</p><br/>
        <p>Marina: {this.props.marinas.find(marina => marina.id === this.props.product.marina_id).name}</p><br/>
      </div>
      <nav className="level is-mobile">
        <div className="level-left">
          <a className="level-item button is-primary" onClick={() => {}}>Buy One Time</a>
          <a className="level-item button is-info" onClick={() => {}}>Subscribe for regular service</a>
        </div>
      </nav>
    </div>
  </article>
  })
  render() {
    const { user, product, history } = this.props
    return (
      <div className='column'>
        {this.priceList}
      </div>
    )
  }
}
