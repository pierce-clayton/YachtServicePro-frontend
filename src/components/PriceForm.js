import React, { Component } from 'react'
import axios from 'axios'

export default class PriceForm extends Component {
  state = {
    productStripeId: '',
    priceUnit: '',
    recurringInterval: '',
    recurringCount: 1

  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    axios.post(`https://backend.baracus.rocks/products/${this.props.product.id}/prices`,{
      unit_amount: parseInt(this.state.priceUnit) * 100,
      recurring_interval: this.state.recurringInterval,
      recurring_count: this.state.recurringCount.toString()
    },{withCredentials: true} )
    .then(response => {
      // console.log(response)
      this.props.handleSelectedProduct(response.data)
      location.reload()
    })
    
  }
  render() {
    return (
      <div className='column'>
      <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">{this.props.product.name} Price in dollars</label>
            <div className="control">
              <input type="number" name="priceUnit" value={this.state.priceUnit} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="field">
            <label className="label">Recurring Count</label>
            <div className="control">
              <input type="number" name="recurringCount" value={this.state.recurringCount} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="field">
          <label className="label">Recurring Interval</label>
          <div className="control">
            <div className="select">
              <select value={this.state.recurringInterval} name="recurringInterval" onChange={this.handleChange}>
                <option value=''></option>
                <option value='week'>Week</option>
                <option value='month'>Month</option>
                <option value='year'>Year</option>
              </select>
            </div>
          </div>
        </div>
          <div className="field">
          <label className="label">Select Type of Price</label>
          <div className="control">
            <div className="select">
              <select value={this.state.marina} name="marina" onChange={this.handleChange}>
                <option value='one-time'>One Time</option>
                <option value='recurring'>Recurring</option>
              </select>
            </div>
          </div>
        </div>
          <div className="field">
          <div className="control">
            <button className="button is-success" type="submit">Add Price</button>
            </div>
          </div>
        </form>
    </div>
    )
  }
}
