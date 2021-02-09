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
      
      sub_sched_id: '',
      scheds: [],
      sched_to_render: [],

      noSched: false,
      duplicateId: false,
      emptySched: false,
      registerError: false
    }
  }

  handleInputChange = (event) => {
    const {name, value} = event.target;    
    this.setState({
      [name]: value
    })
  }

  registerStudent = (event) => {
    event.preventDefault(); // prevents default refresh
    
  }

  addToSched = () => {
    
  }

  backToDept = () => {
    this.props.history.push('/departments', this.props.history.location.state);
  }

  removeSched = (sched_id) => {    
    
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
            {/* // lists out all options from user list
              this.state.subjects.map(function (sub) {
                return <option
                    key={sub.id}
                    value={sub.id}>{sub.name}
                </option>;
              })
             */}
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
