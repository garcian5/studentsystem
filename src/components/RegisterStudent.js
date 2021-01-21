import React, { Component } from 'react'

export default class RegisterStudent extends Component {
  constructor () {
    super();
    this.state = {
      id: '',
      name: '',
      age: 0,
      dob: new Date(),
      address: '',
      contact_num: '',
      course: '',
      year_sec: ''
    }
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;

    this.setState({
      [name]: value
    })
  }

  render() {
    //console.log(this.props.history.location.state);
    return (
      <div>
        <form>
          <input 
            type = "text" 
            name = "id" 
            value = {this.state.id}
            onChange = {this.handleInputChange}
          />
        </form>
      </div>
    )
  }
}
