import React, { Component } from 'react';
import axios from 'axios';

// import images
import E1 from '../imgs/1.jpg';
import L2 from '../imgs/2.jpg';
import P3 from '../imgs/3.jpg';
import DeleteModal from './other/DeleteModal';

export default class StudentInfo extends Component {
  constructor() {
    super();
    this.state = {
      student_info: {},
      grades: [],
      errorMsg: '',
      delModalShow: false,
      accessAllowed: false,
      firstMount: true
    }
  }

  componentDidMount() {
    // if our state is not empty we allow access, if it is we deny access to page
    if (this.props.history.location.state !== undefined) {
      axios.all([
        axios.get('/student/getstudent/' + this.props.history.location.state),
        axios.get('/grade/getgrades/' + this.props.history.location.state)
      ])
        .then(axios.spread((res1, res2) => {
          this.setState({
            student_info: res1.data, 
            grades: res2.data,
            accessAllowed: true, 
            firstMount: false
          })
        }))
        .catch(err => { this.setState({ errorMsg: err.response.data.msg }) });
    }
  }

  // go back to student directory page
  backBtnClicked = () => {
    // this.props.history.location.state = student id
    this.props.history.push('/student-directory', this.props.history.location.state);
  }

  updateBtnClicked = () => {
    const student_info = {
      student_info: this.state.student_info,
      schedule: this.state.schedule
    }
    this.props.history.push('/student-update', student_info);
  }

  deleteBtnClicked = () => this.setState({delModalShow: true})
  onModalHide = () => this.setState({delModalShow: false})

  render() {
    // object destructuring - for easy use
    //const {student_info} = this.state;
        
    // if we are allowed access to page and the page is not on the first stage of mounting, display student info
    if (this.state.accessAllowed && !this.state.firstMount) {
      const {student_info, grades, delModalShow} = this.state;

      // render schedule table
      const renderSchedule = student_info.sub_sched_lst.map (sched => (
        <tr key={sched._id}>
          <td>{sched.time.from} - {sched.time.to}</td>
          <td>{sched.subject_id.subject_name}</td>
          <td>{sched.day}</td>
          <td>{sched.subject_id.instructor_id.instructor_name}</td>
        </tr>
      ))

      // render grades table
      const renderGrades = grades.map (grade => (
        <tr key={grade._id}>
          <td>{grade.subject_id.subject_name}</td>
          <td>{grade.prelim}</td>
          <td>{grade.midterm}</td>
          <td>{grade.final}</td>
        </tr>
      ))

      return (
        <div>
          <button className='back-btn link-style-btn' onClick={this.backBtnClicked}>Back</button>
          <button className='link-style-btn' onClick={this.updateBtnClicked}>Update</button>
          <button className='link-style-btn' onClick={this.deleteBtnClicked}>Delete</button> <br/>
          
          {
            student_info.lastname.charAt(0).concat(student_info.student_id) === 'E1' ? <img src={E1} alt="empanso"/>
            : student_info.lastname.charAt(0).concat(student_info.student_id) === 'L2' ? <img src={L2} alt="lore"/>
            : student_info.lastname.charAt(0).concat(student_info.student_id) === 'P3' ? <img src={P3} alt="perez"/>
            : <h4>No Image</h4>
          }

          <p>Student ID Number: {student_info.student_id}</p>
          <p>Name: {student_info.firstname} {student_info.middlename} {student_info.lastname}</p>
          <p>Date of Birth: {student_info.dob.toString().substring(3, 15)}</p>
          <p>Age: {student_info.age}</p>
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

          {
            this.state.grades.length === 0 ?
            <div>
              <p>No Grades to display yet.</p>
            </div>
            : 
            <div>
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
          }
          <DeleteModal 
            show={delModalShow}
            onHide={this.onModalHide}
            student_id={student_info._id}
          />
        </div>
      )
    } else if (this.state.firstMount) {
      return (<div><p>Loading...</p></div>)
    } else if (!this.state.accessAllowed) {
      // display error message if access not allowed or it's not first mount
      return (
        <div>
          <h1>Sorry, you have no access to this page</h1>
        </div>
      )
    }
  }
}
