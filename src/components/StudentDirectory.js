import React, { Component } from 'react'

export default class StudentDirectory extends Component {
  // go back to departments page
  backBtnClicked = () => {
    this.props.history.push('/departments', this.props.history.location.state);
  }
  render() {
    return (
      <div>
        <button onClick={this.backBtnClicked}>Back</button>
        <button>Home</button>
        <h1>ICS Student Directory</h1>
        <h6>Name List</h6>
        {/*list of names */}
      </div>
    )
  }
}
