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

  toStudentIfoClicked = (student_id) => {
    this.props.history.push('/student-info', student_id);
  }

  // go to register page
  registerClicked = () => {
    this.props.history.push('/student-register', this.props.history.location.state);
  }

  render() {
    // iterate through the list of students and display their names in the list.
    const students_lst = this.state.students.map(student => (
      <ul key={student.id}>
        <li>
          <button className='link-style-btn' onClick={() => this.toStudentIfoClicked(student.id)}>{student.lastname}, {student.firstname} {student.middlename}</button>
        </li>
      </ul>
    ))
    
    return (
      <div>
        <button className='link-style-btn' onClick={this.backBtnClicked}>Back</button>
        <button className='link-style-btn' onClick={this.backBtnClicked}>Home</button>
        <h1 className='departments-heading'>ICS Student Directory</h1>
        <p className='name-lst'>Name List</p>
        {students_lst.length !== 0 ? students_lst 
          : 
          <div>            
            <p>No Students in this Department. Please register new students here:</p>
            <button className='link-style-btn' onClick={this.registerClicked}>Register</button>
          </div>
        }
      </div>
    )
  }
}
