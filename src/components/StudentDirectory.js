import React, { Component } from 'react';

// import database stuff
import students from '../data/students';

export default class StudentDirectory extends Component {
  constructor() {
    super();
    this.state = {
      students: students // list of students from database
    }
  }

  // go back to departments page
  backBtnClicked = () => {
    this.props.history.push('/departments', this.props.history.location.state);
  }
  render() {
    // iterate through the list of students and display their names in the list.
    const students_lst = this.state.students.map(student => (
      <ul key={student.id}>
        <li>{student.lastname}, {student.firstname} {student.middlename}</li>
      </ul>
    ))
    return (
      <div>
        <button onClick={this.backBtnClicked}>Back</button>
        <button>Home</button>
        <h1>ICS Student Directory</h1>
        <h6>Name List</h6>
        {students_lst}
      </div>
    )
  }
}
