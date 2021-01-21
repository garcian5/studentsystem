import React, { Component } from 'react';

import studentsdata from '../data/students';

export default class RegisterStudent extends Component {
  constructor () {
    super();
    this.state = {
      id: '',
      firstname: '',
      lastname: '',
      middlename: '',
      age: 0,
      dob: '',
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

  registerStudent = (event) => {
    event.preventDefault();
    const addStudent = {
      id: this.state.id,
      lastname: this.state.lastname, 
      firstname: this.state.firstname, 
      middlename: this.state.middlename,
      age: this.state.age,
      dob: this.state.dob.toString(), // subtract actual month by 1 to get accurate date
      address: this.state.address,
      contact: this.state.contact_num,
      course: this.state.course,
      yearsection: this.state.year_sec,
      // this section will be references to different tables that this has a relationship with
      subject_schedule_id: ''
    }    

    studentsdata.push(addStudent);
    console.log(studentsdata)
  }

  backToDept = () => {
    this.props.history.push('/departments', this.props.history.location.state);
  }

  render() {
    //console.log(this.props.history.location.state);
    return (
      <div>
        <button onClick={this.backToDept}>Back</button>
        <form onSubmit={this.registerStudent}>
          <label>Student ID Number: </label>
          <input 
            type = "text" 
            name = "id" 
            value = {this.state.id}
            onChange = {this.handleInputChange}
          /> <br />
          <label>First Name: </label>
          <input 
            type = "text" 
            name = "firstname" 
            value = {this.state.firstname}
            onChange = {this.handleInputChange}
          />
          <label>Last Name: </label>
          <input 
            type = "text" 
            name = "lastname" 
            value = {this.state.lastname}
            onChange = {this.handleInputChange}
          /> <br />
          <label>Middle Name: </label>
          <input 
            type = "text" 
            name = "middlename" 
            value = {this.state.middlename}
            onChange = {this.handleInputChange}
          /> <br />
          <label>Age: </label>
          <input 
            type = "number" 
            name = "age" 
            value = {this.state.age}
            onChange = {this.handleInputChange}
          /> <br />
          <label>Date of Birth: </label>
          <input 
            type = "Date" 
            name = "dob" 
            value = {this.state.dob}
            onChange = {this.handleInputChange}
          /> <br />
          <label>Address: </label>
          <input 
            type = "text" 
            name = "address" 
            value = {this.state.address}
            onChange = {this.handleInputChange}
          /> <br />
          <label>Contact Number: </label>
          <input 
            type = "text" 
            name = "contact_num" 
            value = {this.state.contact_num}
            onChange = {this.handleInputChange}
          /> <br />
          <label>Course: </label>
          <input 
            type = "text" 
            name = "course" 
            value = {this.state.course}
            onChange = {this.handleInputChange}
          /> <br />
          <label>Year & Section: </label>
          <input 
            type = "text" 
            name = "year_sec" 
            value = {this.state.year_sec}
            onChange = {this.handleInputChange}
          /> <br />

          <button>Submit</button>
        </form>
      </div>
    )
  }
}
