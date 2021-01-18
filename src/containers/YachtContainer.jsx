import React, { Component } from 'react'
import YachtForm from '../components/YachtForm'

export default class YachtContainer extends Component {

  handleNewYacht = () => {
    
  }

  render() {
    return (
      <div>
        <YachtForm handleNewYacht={this.handleNewYacht} />
      </div>
    )
  }
}
