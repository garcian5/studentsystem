import React, { Component } from 'react';
import Admins from '../data/admins';

export default class Home extends Component {
  /**
   * Constructor handles the state variables of this component
   */
  constructor() {
    super();
    this.state = {
      admins: Admins,
      adminID: '',
      adminPassword: ''
    }
  }

  inputChange = (event) => {
    // these variables will be accessed through the event parameter
    const { name, value } = event.target;
    // set state variable to its entered value
    this.setState({
      [name]: value
    })
  }

  logIn = (event) => {
    // prevents automatic refresh after submit
    event.preventDefault();

    // a flag to check if id exists in the database (assuming there is no duplicate ids); false by default
    let idExists = false;
    let matchingAdmin = {}; // temp variable to hold whatever matching admin is on the database

    // iterate through the list of admins and find if it exists in the database
    for (const admin of this.state.admins) {      
      // if it exists, set flag to true and mutate variable for admin and exit the loop
      if (admin.id === this.state.adminID) {
        idExists = true;
        matchingAdmin = admin;
        break;
      } else {
        // if id doesn't exist, continue the loop
        continue;
      }
    }

    // a switch case statement to check if password matches given the event that the id exists or it sends an error message if id doesn't exist
    switch (idExists) {
      case true:
        if (matchingAdmin.password === this.state.adminPassword) {
          console.log('id and password matches!');
        } else {
          console.log('id matches but password incorrect');
        }
        break;
      default:
        console.log('id does not exist!')
    }
  }

  render() {
    //console.log(Admin.admin1.id); // this is how we get id of admin1
    return (
      <div>
        <form onSubmit={this.logIn}>
          <label>Admin ID Number:
            <input 
              type="text" 
              name="adminID" 
              value={this.state.adminID}
              onChange={this.inputChange}
            />
          </label><br />
          <label>Password:
            <input 
              type="password" 
              name="adminPassword"
              value={this.state.adminPassword}
              onChange={this.inputChange}
            />
          </label><br />
          <button>Log In</button>
        </form>
      </div>
    )
  }
}
