import React, { Component } from 'react'
import axios from 'axios'

export default class ProductForm extends Component {
  state = {
    productName: '',
    productDescription: '',
    marina: '',
    
  }
  
  

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    axios.post('https://backend.baracus.rocks/products',{
      user_id: this.props.user.id,
      marina_id: this.props.marinas.filter(marina => marina.name === this.state.marina).pop().id,
      description: this.state.productDescription,
      name: this.state.productName
    },{withCredentials: true} )
    .then(response => {
      this.props.handleNewProduct(response.data)
    })
  }
  render() {
    return (
      <div className='column'>
      <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Product Form</label>
            <div className="control">
              <input type="text" name="productName" placeholder='Product Name' value={this.state.productName} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input type="text" name="productDescription" placeholder='Description' value={this.state.productDescription} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="field">
          <label className="label">Select Marina</label>
          <div className="control">
            <div className="select">
              <select value={this.state.marina} name="marina" onChange={this.handleChange}>
                <option value=''></option>
                {this.props.marinas.map((marina) => {
      return <option value={marina.name} name={marina.name} key={marina.id}>{marina.name}</option>
    })}
              </select>
            </div>
          </div>
        </div>
          <div className="field">
          <div className="control">
            <button className="button is-success" type="submit">Add Product</button>
            </div>
          </div>
        </form>
    </div>
    )
  }
}
