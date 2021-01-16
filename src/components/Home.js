import React, { Component } from 'react'

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
