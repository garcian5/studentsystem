import React, { Component } from 'react';
import axios from 'axios';

// import database stuff
//import students from '../data/students';

export default class StudentDirectory extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      errorMsg: '',
      firstMount: true
    }
    /* this.state = {
      students: students // list of students from database
    } */
  }

  componentDidMount () {
    axios.get('/student/getstudents')
      .then(res => {
        this.setState({students: res.data})
      })
      .catch(err => { this.setState({ errorMsg: err.response.data.msg }) });
  }

  componentDidUpdate () {if (this.state.firstMount) this.setState({firstMount: false})}

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
    if (this.state.firstMount) {
      return (
        <div><p>Loading...</p></div>
      )
    } else {
      // iterate through the list of students and display their names in the list.
      const students_lst = this.state.students.map(student => (
        <ul key={student._id}>
          <li>
            <button className='link-style-btn' onClick={() => this.toStudentIfoClicked(student._id)}>{student.lastname}, {student.firstname} {student.middlename}</button>
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
}
