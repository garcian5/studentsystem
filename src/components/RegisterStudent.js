import React, { Component } from 'react';

import {getSubjects, getSubject_Schedules} from '../scripts/getRequests';
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
      scheds: []
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
    const newStudentSched = {
      id: `${this.state.firstname}_${this.state.firstname}_sched_${this.state.id}`,
      subject_sched_lst: this.state.scheds
    }
    schedules.push(newStudentSched);
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
    console.log(addStudent.subject_schedule_id)
    studentsdata.push(addStudent);

    // select subject
    // select time
    // add subjects to schedule and create a schedule id
    // add schedule id to students
  }

  addToSched = () => {
    // gets the remaining schedules that were not selected by the user
    const availableScheds = this.state.sub_scheds.filter(subs => {
      return subs.id !== this.state.sub_sched_id
    })
    const availableSubjects = this.state.subjects.filter(subs => {
      return subs.id !== this.state.subject_id
    })
    
    if (this.state.scheds.length <= 3) {
      this.setState({
        scheds: [...this.state.scheds, this.state.sub_sched_id],
        sub_scheds: availableScheds,
        subjects: availableSubjects
      })
    }
  }

  backToDept = () => {
    this.props.history.push('/departments', this.props.history.location.state);
  }

  render() {
    //console.log(schedules);
    //console.log(this.props.history.location.state);
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
          />
          <label>{subsched.time.from} - {subsched.time.to}</label>
        </div>
      )
    )

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

          <label>Department: </label>
          <select name="departments">
            <option value="ICS">ICS</option>
          </select> <br />
          
          
          <label>Select a Subject: </label>
          <select
            name="subject_id"
            value={this.state.subject_id}
            onChange={this.handleInputChange}
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

          <button type='button' onClick={this.addToSched}>Add to Schedule</button>

          <button>Submit</button>
        </form>
      </div>
    )
  }
}
