import React, { Component } from 'react'
import YachtForm from '../components/YachtForm'
import axios from 'axios'
import Yacht from '../components/Yacht'

export default class YachtContainer extends Component {
  state = {
    name: '',
    length: '20',
    reg_num: '',
    sailboat: false,
    marina: '',
    displayedYachts: []
  }
  
  componentDidMount() {
    axios.get(`https://backend.baracus.rocks/customers/${this.props.customer.id}`, {withCredentials: true})
    .then(response => {
      const cust = response.data
      if (cust.yachts.length > 0) {
        this.setState({displayedYachts: cust.yachts})
      }
    })
  }


  handleNewYacht = (e) => {
    if (e.target.value === 'submit') {
      axios.post('https://backend.baracus.rocks/yachts.json' , {
        name: this.state.name,
        length: this.state.length,
        registration_number: this.state.reg_num,
        sail: this.state.sailboat,
        marina_id: this.props.marinas.find(marina => marina.name === this.state.marina).id
      },{withCredentials: true})
      .then(response => {
        this.setState(prevState => ({
          displayedYachts: [...prevState.displayedYachts, response.data]
        }))
      })
    } else if (e.target.value === 'cancel'){
      this.setState({
        name: '',
        length: '20',
        reg_num: '',
        marina: ''
      })
    }
  }
  handleEditYacht = (yacht) => {
    this.setState({
      name: yacht.name,
      length: yacht.length,
      reg_num: yacht.registration_number,
      marina: this.props.marinas.filter(marina => marina.id === yacht.marina_id)
    })
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
        <Yacht 
        history={this.props.history}
        yachts={this.state.displayedYachts}
        handleEditYacht={this.handleEditYacht}
        marinas={this.props.marinas}
        handleSelectedYacht={this.props.handleSelectedYacht}
        />
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
