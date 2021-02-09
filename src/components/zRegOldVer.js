import React, { Component } from 'react';

import {getSubjects, getSubject_Schedules, getNewRegisteredSched, getRestoredSubject, getRestoredSched, getStudents} from '../scripts/getRequests';
import studentsdata from '../data/students';
import schedules from '../data/schedules';

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

      subjects: getSubjects(),
      sub_scheds: getSubject_Schedules(),
      subject_id: '',
      sub_sched_id: '',
      scheds: [],
      sched_to_render: [],

      noSched: false,
      students_lst: getStudents(),
      duplicateId: false,
      emptySched: false,
      registerError: false
    }
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;
    // checks if id is not a duplicate in the students database
    let checkExistingId = [];
    if (name === 'id') {
      checkExistingId = this.state.students_lst.filter(student => {
        return value === student.id
      })
    }
    // if id exists, don't let them enter
    if (checkExistingId.length > 0) {
      this.setState({
        [name]: value,
        duplicateId: true
      })
    } else if (name === 'id' && checkExistingId.length <= 0) {
      this.setState({
        [name]: value,
        duplicateId: false
      })
    } else {      
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

    // create a new object for new student schedule to post onto the schedules 'database'
    const newStudentSched = {
      id: `${this.state.firstname}_${this.state.firstname}_sched_${this.state.id}`,
      subject_sched_lst: this.state.scheds
    }
    schedules.push(newStudentSched);

    // create a new object for student to post onto the student 'database' including the newly created student schedule
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
      subject_schedule_id: newStudentSched.id
    }    
    studentsdata.push(addStudent);    
    this.props.history.push('/student-directory', this.props.history.location.state);
  }

  addToSched = () => {
    const checkDuplicateSched = this.state.scheds.filter(sched => {
      return sched === this.state.sub_sched_id
    })
    // if selected schedule is an empty string
    if (this.state.sub_sched_id === '') {
      this.setState({
        emptySched: true
      })
      return
    } else if (checkDuplicateSched.length > 0) {
      return;
    } else {
      // gets the remaining schedules that were not selected by the user
      const availableScheds = this.state.sub_scheds.filter(subs => {
        return subs.id !== this.state.sub_sched_id
      })
      const availableSubjects = this.state.subjects.filter(subs => {
        return subs.id !== this.state.subject_id
      })
      
      // has a limit of 3 subjects to add into the schedule
      // sub_scheds and subjects are modified whenever a time is selected so that it removes the ones already selected by the user
      if (this.state.scheds.length <= 3) {
        this.setState({
          scheds: [...this.state.scheds, this.state.sub_sched_id],
          sched_to_render: getNewRegisteredSched([...this.state.scheds, this.state.sub_sched_id]),
          sub_scheds: availableScheds,
          subjects: availableSubjects,
          emptySched: false
        })
      }
    }
  }

  backToDept = () => {
    this.props.history.push('/departments', this.props.history.location.state);
  }

  removeSched = (sched_id) => {    
    const removeSched = this.state.scheds.filter(sched => {
      return sched !== sched_id
    })
    const restoredSub = getRestoredSubject(sched_id);
    const restoredSched = getRestoredSched(sched_id);
    this.setState({
      scheds: removeSched,
      sched_to_render: getNewRegisteredSched(removeSched),
      subjects: [...this.state.subjects, restoredSub],
      sub_scheds: [...this.state.sub_scheds, restoredSched]
    })
  }

  render() {
    //console.log(this.state.scheds)
    //console.log(this.props.history.location.state);

    // if state subject_id is empty, this will not be rendered
    // but if it's not empty, it will filter the schedules according to the selected subject and then render the times of that subject
    const filterSched = this.state.sub_scheds.filter(subsched => this.state.subject_id === subsched.subject_id)
    
    const renderSubSchedTime = filterSched.map(subsched => 
      (
        <div key={subsched.id}>
          <input 
            type="radio" 
            name="sub_sched_id" 
            value={subsched.id}
            checked={this.state.sub_sched_id === subsched.id}
            onChange={this.handleInputChange}
            required
          />
          <label>{subsched.time.from} - {subsched.time.to}</label>
        </div>
      )
    )

    const schedTable = this.state.sched_to_render.map(sched => (
      <tr key={sched.id}>
        <td><button onClick={() => this.removeSched(sched.id)}>Remove</button></td>
        <td>{sched.time.from} - {sched.time.to}</td>
        <td>{sched.subject_name}</td>
        <td>{sched.day}</td>
        <td>{sched.instructor_name}</td>
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
            {// lists out all options from user list
              this.state.subjects.map(function (sub) {
                return <option
                    key={sub.id}
                    value={sub.id}>{sub.name}
                </option>;
              })
            }
          </select><br />
          
          {
            this.state.subject_id !== '' ?
            renderSubSchedTime : null
          } <br />

          <button type='button' onClick={this.addToSched}>Add to Schedule</button><br />

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

          <button>Register Student</button>
        </form>
      </div>
    )
  }
}
