import React, { Component } from 'react';

// import data
import studentsdata from '../data/students';

export default class StudentInfo extends Component {
  constructor() {
    super();
    this.state = {
      student_info: [],
      accessAllowed: false,
      firstMount: true
    }
  }

  componentDidMount() {
    // if our state is not empty we allow access, if it is we deny access to page
    if (this.props.history.location.state !== undefined) {
      // we filter student data that equals to the id of the student so we can get their info and store it in our student_info state
      const student = studentsdata.filter(student => {
        return student.id === this.props.history.location.state;
      })
      this.setState({
        accessAllowed: true,
        student_info: student,
        firstMount: false
      })
    }
  }

  render() {
    // object destructuring - for easy use
    //const {student_info} = this.state;
    const student_info = this.state.student_info[0];
    
    // if we are allowed access to page and the page is not on the first stage of mounting, display student info
    if (this.state.accessAllowed && !this.state.firstMount) {
      return (
        <div>
          <p>Student ID Number: {student_info.id}</p>
          <p>Name: {student_info.firstname} {student_info.middlename} {student_info.lastname}</p>
          <p>Date of Birth: {student_info.dob.toString().substring(3, 15)}</p>
          <p>Address: {student_info.address}</p>
          <p>Contact Number: {student_info.contact}</p>
          <p>Course: {student_info.course}</p>
          <p>Year and Section: {student_info.yearsection}</p>
        </div>
      )
    } else if (!this.state.accessAllowed || this.state.firstMount) {
      // display error message if access not allowed or it's not first mount
      return (
        <div>
          <h1>Sorry, you have no access to this page</h1>
        </div>
      )
    }
  }
}
