import React, { Component } from 'react'
import axios from 'axios'

export default class Registration extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    registrationError: ''
  }

  handleSubmit = (event) => {
    const { email, password, password_confirmation } = this.state
    event.preventDefault()
    axios.post('https://backend.baracus.rocks/registrations', {
      customer: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    }, {
      withCredentials: true
    }).then(response => {
      if (response.data.status === 'created'){
        this.props.handleSuccessfulAuth(response.data)
      }
    }).catch(error => {
      console.log('error', error);
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Register new Customer</label>
            <div className="control">
              <input type="email" name="email" placeholder='Email' value={this.state.email} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input type="password" name="password" placeholder='Password' value={this.state.password} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input type="password" name="password_confirmation" placeholder='Confirm Password' value={this.state.password_confirmation} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="field">
          <div className="control">
            <button className="button is-success" type="submit">Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
