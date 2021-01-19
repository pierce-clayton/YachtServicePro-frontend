import React, { Component } from 'react'
import YachtForm from '../components/YachtForm'
import axios from 'axios'

export default class YachtContainer extends Component {
  state = {
    name: '',
    length: '20',
    reg_num: '',
    sailboat: false,
    marina: ''
  }
  componentDidMount() {
    
  }
  handleNewYacht = (e) => {
    if (e.target.value === 'submit') {
      // handle new yacht here
    } else if (e.target.value === 'cancel'){
      this.setState({
        name: '',
        length: '20',
        reg_num: '',
        marina: ''
      })
    }
    console.log(e.target.value)
  }
  handleChange = (event) => {
    if (event.target.name === 'sailboat'){
      this.setState({
        sailboat: !this.state.sailboat      
      })
    }else {
      this.setState({
        [event.target.name]:event.target.value      
      })
    }
  }

  render() {
    return (
      <div>
        <YachtForm
        handleNewYacht={this.handleNewYacht}
        handleChange={this.handleChange}
        name={this.state.name}
        length={this.state.length}
        reg_num={this.state.reg_num}
        sailboat={this.state.sailboat}
        marina={this.state.marina}
        marinas={this.props.marinas}
        />
      </div>
    )
  }
}
