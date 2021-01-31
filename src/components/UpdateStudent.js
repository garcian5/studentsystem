import React, { Component } from 'react'

export default class UpdateStudent extends Component {
  constructor () {
    super();
    this.state = {
      student_info: []
    }
  }

  componentDidMount() {
    // if our state is not empty we allow access, if it is we deny access to page
    if (this.props.history.location.state !== undefined) {
      this.setState({
        student_info: this.props.history.location.state
      })
    }
  }

  // go back to student directory page
  backBtnClicked = () => {
    // this.props.history.location.state = student id
    this.props.history.push('/student-directory', this.props.history.location.state);
  }

  render() {
    console.log(this.state.student_info)
    return (
      <div>
        <button className='back-btn link-style-btn' onClick={this.backBtnClicked}>Back</button>
      </div>
    )
  }
}
