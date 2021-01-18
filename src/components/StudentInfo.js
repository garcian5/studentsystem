import React, { Component } from 'react'

export default class StudentInfo extends Component {
  constructor() {
    super();
    this.state = {
      student_info: {},
      accessAllowed: false,
      firstMount: true
    }
  }

  componentDidMount() {
    if (this.props.history.location.state !== undefined) {
      this.setState({
        accessAllowed: true,
        firstMount: false
      })
    }
  }

  render() {
    // if we are allowed access to page and the page is not on the first stage of mounting, display student info
    if (this.state.accessAllowed && !this.state.firstMount) {
      return (
        <div>
          {this.props.history.location.state}
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
