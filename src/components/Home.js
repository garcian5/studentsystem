import React, { Component } from 'react';
import Admin from '../data/admins';

export default class Home extends Component {
  /**
   * Constructor handles the state variables of this component
   */
  constructor() {
    super();
    this.state = {
      
    }
  }
  render() {
    //console.log(Admin.admin1.id); // this is how we get id of admin1
    return (
      <div>
        <form>
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
