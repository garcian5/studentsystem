import React, { Component } from 'react';

// import data
import studentsdata from '../data/students';
import subjects from '../data/subjects';
import schedule from '../data/schedules';
import subjects_sched from '../data/subject_schedules';
import instructors from '../data/instructors';
import grades from '../data/grades';

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

      // SCHEDULE
      // get schedule
      const sched = schedule.filter(s => {
        return student[0].subject_schedule_id === s.id
      })      
      // get subject schedule from sched
      const sub_sched = [];
      // iterate through type of schedule that we got from earlier then iterate through the subjects schedules and check if the subject sched id matches and add them onto our array
      for (const subsched_id of sched[0].subject_sched_lst) {
        for (const subsched of subjects_sched) {
          if (subsched_id === subsched.id) {
            sub_sched.push(subsched);
          }
        }
      }
      // get subject name from sub_sched
      const complete_schedule = [];
      let temp_sched = {};
      // iterate through subject schedules to find subject name from subjects table, as well, find the instructors for each subject and store matching ones onto complete schedule
      for (const sub of sub_sched) {
        temp_sched = sub;
        for (const subject of subjects) {
          if (subject.id === sub.subject_id) {
            temp_sched.subject_name = subject.name;
            temp_sched.instructor_id = subject.instructor_id;
          }          
        }
        for (const inst of instructors) {
          if (inst.id === temp_sched.instructor_id) {
            temp_sched.instructor_name = inst.name;
          }
        }
        complete_schedule.push(temp_sched);
      }
      //console.log(sub_name);

      // GRADES
      const grades_lst = [];
      let temp_grade_info = {};
      for (const subject of subjects) {
        for (const grade of grades) {
          if (student[0].id === grade.student_id && subject.id === grade.subject_id) {
            temp_grade_info = grade;
            temp_grade_info.subject_name = subject.name;
          }
        }
        grades_lst.push(temp_grade_info);
      }
      
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
