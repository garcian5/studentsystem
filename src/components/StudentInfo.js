import React, { Component } from 'react'

export default class StudentInfo extends Component {
  render() {
    return (
      <div>
        {this.props.history.location.state}
      </div>
    )
  }
}
