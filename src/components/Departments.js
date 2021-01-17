import React, { Component } from 'react';

export default class Departments extends Component {
  constructor() {
    super();
    this.state = {
      admin: {},

      accessAllowed: false,
      firstMount: true
    }
  }

  /**
   * This is a lifecycle function that handles the initial mount of the component
   */
  componentDidMount () {
    // this variable takes the state (admin info) we got from the login page
    const adminState = this.props.history.location.state;
    // if adminstate exists, we take it and store it into this state
    if(adminState !== undefined) {
      this.setState({
        accessAllowed: true,
        admin: adminState
      })
    } else { // if it doesn't exist we don't allow access to this page
      this.setState({
        accessAllowed: false
      })
    }
  }

  /**
   * This is a lifecycle function that handles every update of the component
   */
  componentDidUpdate () {
    if (this.state.firstMount) {
      this.setState({
        firstMount: false
      })
    }
  }

  // go back to login page
  backBtnClicked = () => {
    window.location = '/';
  }

  // got to student directory page
  icsBtnClicked = () => {
    this.props.history.push('/student-directory', this.state.admin);
  }

  render() {
    // if the component is in its first mount, don't display contents
    if (this.state.firstMount) {
      return (<h3>Loading...</h3>)
    } else if (this.state.accessAllowed && !this.state.firstMount) {
      // if access allowed and not first mount, display contents
      return (
        <div>
          <button>Departments</button>
          <button>Register</button>
          <h1>Departments</h1>
          <button onClick={this.icsBtnClicked}>ICS</button><br />
          <button onClick={this.backBtnClicked}>Sign Out</button>
        </div>
      )
    } else if (!this.state.accessAllowed && !this.state.firstMount) {
      // if access denied, display error message
      return (
        <div>
          <button onClick={this.backBtnClicked}>Back</button>
          <h1>Sorry, you have no access to this page at this time, please go back to the main page and log in.</h1>
        </div>
      )
    }
  }
}
