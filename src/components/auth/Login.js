import React, { Component } from 'react'
import axios from 'axios'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    registrationError: ''
  }
  // 'https://gentle-caverns-38062.herokuapp.com/sessions'
  handleSubmit = (event) => {
    const { email, password } = this.state
    event.preventDefault()
    axios.post('https://backend.baracus.rocks/sessions', {
      user: {
        email: email,
        password: password
      }
    }, {
      withCredentials: true
    }).then(response => {
      if (response.data.logged_in){
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
            <label className="label">Provider Login</label>
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
            <button className="button is-success" type="submit">Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
