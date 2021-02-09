import React, { Component } from 'react';
import axios from 'axios';

/* import {getSubjects, getSubject_Schedules, getNewRegisteredSched, getRestoredSubject, getRestoredSched, getStudents} from '../scripts/getRequests';
import studentsdata from '../data/students';
import schedules from '../data/schedules'; */

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
      year_sec: '',
      
      sub_scheds: [],
      subject_id: '',
      
      sub_sched_id: '',
      scheds: [],
      sched_to_render: [],

      noSched: false,
      duplicateId: false,
      emptySched: false,
      registerError: false,

      firstMount: true,
      students: [],
      sent: false,
      errorMsg: ''
    }
  }

  componentDidMount () {
    axios.all([
      axios.get('subsched/allsubscheds'),
      axios.get('student/getstudents')
    ])
      .then(axios.spread((res1, res2) => {
        this.setState({sub_scheds: res1.data, students: res2.data, firstMount: false})
      }))
      .catch(err => { this.setState({ errorMsg: err.response.data.msg }) });
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;    
    // check if the inputted student id is a duplicate
    let duplicateStudentID = [];
    if (name === 'id') {
      duplicateStudentID = this.state.students.filter(student => value === student.student_id);      
    } 
    if (duplicateStudentID.length > 0) this.setState({[name]: value, duplicateId: true})
    else if (name === 'id' && duplicateStudentID.length <= 0) this.setState({[name]: value, duplicateId: false})
    else {
      this.setState({
        [name]: value
      })
    }
  }

  registerStudent = (event) => {
    event.preventDefault(); // prevents default refresh
    
    // if user did not enter a schedule, do not let them register
    if (this.state.scheds.length <= 0) {
      this.setState({ noSched: true })
      return
    } 
    
    if (this.state.duplicateId) {
      this.setState({ registerError: true });
      return
    }

    const send_subschedlst = this.state.scheds.map(sched => sched._id);

    // create a new object for student to post onto the student 'database' including the newly created student schedule
    const addStudent = {
      student_id: this.state.id,
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
      sub_sched_lst: send_subschedlst
    }

    axios.post('http://localhost:5000/student/addstudent', addStudent)
      .then(res => {
        console.log(res.data + " sent!");
        this.setState({sent: true});
        //this.props.history.push('/student-directory', this.props.history.location.state);
      })
      .catch(err => { 
        console.log(err.response.data.msg)
        this.setState({ errorMsg: err.response.data.msg }) });
  }

  addToSched = () => {
    const checkDuplicateSched = this.state.scheds.filter(sched => { return sched === this.state.sub_sched_id })

    // if selected schedule is an empty string
    if (this.state.sub_sched_id === '') {
      this.setState({ emptySched: true })
      return
    } else if (checkDuplicateSched.length > 0) return;
    else {
      // gets the remaining schedules that were not selected by the user
      const availableScheds = this.state.sub_scheds.filter(subs => {        
        return subs._id !== this.state.sub_sched_id
      })
      const schedule = this.state.sub_scheds.filter(sched => sched._id === this.state.sub_sched_id)
      this.setState({
        scheds: [...this.state.scheds, schedule[0]],
        sched_to_render: [...this.state.scheds, schedule[0]],
        sub_scheds: availableScheds,
        emptySched: false,
        subject_id: ''
      })
    }
  }

  backToDept = () => {
    this.props.history.push('/departments', this.props.history.location.state);
  }

  removeSched = (sched_id) => {    
    const removeSched = this.state.scheds.filter(sched => {
      return sched._id !== sched_id
    })
    const restoredSched = this.state.scheds.filter(sched => sched._id === sched_id)
    this.setState({
      scheds: removeSched,
      sched_to_render: removeSched,
      sub_scheds: [...this.state.sub_scheds, restoredSched[0]]
    })
  }

  render() {
    if (this.state.firstMount) {
      return ( <div><p>Loading...</p></div> )
    } else {
      // if state subject_id is empty, this will not be rendered
      // but if it's not empty, it will filter the schedules according to the selected subject and then render the times of that subject
      const filterSched = this.state.sub_scheds.filter(subsched => this.state.subject_id === subsched.subject_id._id)
      
      const renderSubSchedTime = filterSched.map(subsched => 
        (
          <div key={subsched._id}>
            <input 
              type="radio" 
              name="sub_sched_id" 
              value={subsched._id}
              checked={this.state.sub_sched_id === subsched._id}
              onChange={this.handleInputChange}
              required
            />
            <label>{subsched.time.from} - {subsched.time.to} {subsched.day}</label>
          </div>
        )
      )

      const schedTable = this.state.sched_to_render.map(sched => (
        <tr key={sched._id}>
          <td><button onClick={() => this.removeSched(sched._id)}>Remove</button></td>
          <td>{sched.time.from} - {sched.time.to}</td>
          <td>{sched.subject_id.subject_name}</td>
          <td>{sched.day}</td>
          {sched.subject_id.instructor_id !== undefined ? <td>{sched.subject_id.instructor_id.instructor_name}</td> : <td>Not Available</td>}
        </tr>
      ))
      
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

            <label>Select a Subject: </label>
            <select
              name="subject_id"
              value={this.state.subject_id}
              onChange={this.handleInputChange}
              required
            >
              <option>Please Select a Subject</option>
              {// go through all sub scheds and render subject name
                this.state.sub_scheds.map(function (sub) {
                  return <option
                      key={sub.subject_id._id}
                      value={sub.subject_id._id}>{sub.subject_id.subject_name}
                  </option>;
                })
              }
            </select><br />

            {
              this.state.subject_id !== '' ?
              <div>
                {renderSubSchedTime}
                <button type='button' onClick={this.addToSched}>Add to Schedule</button><br />
              </div>
              : null
            } <br />

            {
              this.state.sched_to_render.length > 0 ?
              <div>
                <p>SCHEDULE</p>
                <table className='center'>
                  <tbody>
                    <tr>
                      <th></th>
                      <th>TIME</th>
                      <th>SUBJECT</th>
                      <th>DAY</th>
                      <th>INSTRUCTOR</th>
                    </tr>
                    {schedTable}
                  </tbody>
                </table>
              </div>
              : null
            }

            {this.state.noSched ? <p style={{color: 'red'}}>Please Enter a Schedule!</p> : null}
            {this.state.duplicateId ? <p style={{color: 'red'}}>Please Enter a Different Id!</p> : null}
            {this.state.emptySched ? <p style={{color: 'red'}}>Please Select a Subject!</p> : null}
            {this.state.registerError ? <p style={{color: 'red'}}>Register Error!</p> : null}
            {this.state.errorMsg !== '' ? <p style={{color: 'red'}}>{this.state.errorMsg}</p> : null}

            <button>Register Student</button>
          </form>
        </div>
      )
    }
  }
}
