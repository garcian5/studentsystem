import React, { Component } from 'react';
import Admins from '../data/admins';

export default class Home extends Component {
  /**
   * Constructor handles the state variables of this component
   */
  constructor() {
    super();
    this.state = {
      admins: Admins
    }
  }

  logIn = () => {
    console.log('login clicked!')
  }

  render() {
    //console.log(Admin.admin1.id); // this is how we get id of admin1
    return (
      <div>
        <form onSubmit={this.logIn}>
          <label>Admin ID Number:
            <input type="text" name=""/>
          </label><br />
          <label>Password:
            <input type="password" name=""/>
          </label><br />
          <button>Log In</button>
        </form>
      </div>
    )
  }
}
