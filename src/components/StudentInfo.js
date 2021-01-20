import React, { Component } from 'react';

// import data
import studentsdata from '../data/students';

// import get requests
import { getSchedule, getGrades } from '../scripts/getRequests';

export default class StudentInfo extends Component {
  constructor() {
    super();
    this.state = {
      student_info: [],
      schedule: [],
      instructors: [],
      grades: [],

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

      const complete_schedule = getSchedule(student);
      const grades_lst = getGrades(student);
      
      this.setState({
        accessAllowed: true,
        student_info: student,
        schedule: complete_schedule,
        grades: grades_lst,
        firstMount: false
      })
    }
  }

  // go back to student directory page
  backBtnClicked = () => {
    // this.props.history.location.state = student id
    this.props.history.push('/student-directory', this.props.history.location.state);
  }

  render() {
    // object destructuring - for easy use
    //const {student_info} = this.state;
        
    // if we are allowed access to page and the page is not on the first stage of mounting, display student info
    if (this.state.accessAllowed && !this.state.firstMount) {
      const student_info = this.state.student_info[0];
      const {schedule} = this.state; // object destructuring
      const {grades} = this.state; // object destructuring

      // render schedule table
      const renderSchedule = schedule.map (sched => (
        <tr key={sched.id}>
          <td>{sched.time.from} - {sched.time.to}</td>
          <td>{sched.subject_name}</td>
          <td>{sched.day}</td>
          <td>{sched.instructor_name}</td>
        </tr>
      ))

      // render grades table
      const renderGrades = grades.map (grade => (
        <tr key={grade.id}>
          <td>{grade.subject_name}</td>
          <td>{grade.prelim}</td>
          <td>{grade.midterm}</td>
          <td>{grade.final}</td>
        </tr>
      ))

      return (
        <div>
          <button onClick={this.backBtnClicked}>Back</button>
          <p>Student ID Number: {student_info.id}</p>
          <p>Name: {student_info.firstname} {student_info.middlename} {student_info.lastname}</p>
          <p>Date of Birth: {student_info.dob.toString().substring(3, 15)}</p>
          <p>Address: {student_info.address}</p>
          <p>Contact Number: {student_info.contact}</p>
          <p>Course: {student_info.course}</p>
          <p>Year and Section: {student_info.yearsection}</p>

          <p>SCHEDULE</p>
          <table className='center'>
            <tbody>
              <tr>
                <th>TIME</th>
                <th>SUBJECT</th>
                <th>DAY</th>
                <th>INSTRUCTOR</th>
              </tr>
              {renderSchedule}
            </tbody>
          </table>
          
          <p>GRADES</p>
          <table className='center'>
            <tbody>
              <tr>
                <th>SUBJECTS</th>
                <th>PRELIM</th>
                <th>MIDTERM</th>
                <th>FINAL</th>
              </tr>
              {renderGrades}
            </tbody>
          </table>
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
