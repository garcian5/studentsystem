import React, { Component } from 'react';

import students from '../data/students';

export default class UpdateStudent extends Component {
  constructor () {
    super();
    this.state = {
      id: '',
      firstname: '',
      lastname: '',
      middlename: '',
      dob: '',
      address: '',
      contact_num: '',
      course: '',
      year_sec: '',
      age: 0,

      updated: false
    }
  }

  componentDidMount() {
    // if our state is not empty we allow access, if it is we deny access to page
    if (this.props.history.location.state !== undefined) {
      const student_info = this.props.history.location.state[0];
      this.setState({
        id: student_info.id,
        firstname: student_info.firstname,
        lastname: student_info.lastname,
        middlename: student_info.middlename,
        dob: student_info.dob,
        address: student_info.address,
        contact_num: student_info.contact,
        course: student_info.course,
        year_sec: student_info.yearsection,
        age: student_info.age
      })
    }
  }

  // go back to student directory page
  backBtnClicked = () => {
    // this.props.history.location.state = student id
    this.props.history.push('/student-directory', this.props.history.location.state);
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    })
  }

  updateStudent = (event) => {
    event.preventDefault();
    const {id, firstname, middlename, lastname, dob, address, age, contact_num, course, year_sec} = this.state;
    // loop through list of students, find student to update by id
    for (const student of students) {
      // change student info by id and then break loop after update
      if (student.id === id) {
        student.id = id;
        student.firstname = firstname;        
        student.lastname = lastname;        
        student.middlename = middlename;
        student.dob = dob;
        student.address = address;
        student.age = age;
        student.contact = contact_num;
        student.course = course;
        student.yearsection = year_sec;
        break;
      }
    }
    this.setState({
      updated: true
    })
  }

  render() {
    return (
      <div>
        <button className='back-btn link-style-btn' onClick={this.backBtnClicked}>Back</button>

        <form onSubmit={this.updateStudent}>
          <label>Student ID Number: </label>
          <input 
            type = "text" 
            name = "id" 
            value = {this.state.id}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>First Name: </label>
          <input 
            type = "text" 
            name = "firstname" 
            value = {this.state.firstname}
            onChange = {this.handleInputChange}
            required
          />
          <label>Last Name: </label>
          <input 
            type = "text" 
            name = "lastname" 
            value = {this.state.lastname}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>Middle Name: </label>
          <input 
            type = "text" 
            name = "middlename" 
            value = {this.state.middlename}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>Age: </label>
          <input 
            type = "number" 
            name = "age" 
            value = {this.state.age}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>Date of Birth: </label>
          <input 
            type = "Date" 
            name = "dob" 
            value = {this.state.dob}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>Address: </label>
          <input 
            type = "text" 
            name = "address" 
            value = {this.state.address}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>Contact Number: </label>
          <input 
            type = "text" 
            name = "contact_num" 
            value = {this.state.contact_num}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>Course: </label>
          <input 
            type = "text" 
            name = "course" 
            value = {this.state.course}
            onChange = {this.handleInputChange}
            required
          /> <br />
          <label>Year & Section: </label>
          <input 
            type = "text" 
            name = "year_sec" 
            value = {this.state.year_sec}
            onChange = {this.handleInputChange}
            required
          /> <br />

          <label>Department: </label>
          <select name="departments">
            <option value="ICS">ICS</option>
          </select> <br />

          <button>Update {this.state.lastname}</button>
        </form>

        {this.state.updated ? <p>{this.state.firstname} successfully updated!</p> : null}
      </div>
    )
  }
}
