import React, { Component } from 'react';
import Admins from '../data/admins';
import axios from 'axios';

export default class Home extends Component {
  /**
   * Constructor handles the state variables of this component
   */
  constructor() {
    super();
    this.state = {
      admins: Admins,
      adminID: '',
      adminPassword: '',

      errorMsg: ''
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

    const {adminID, adminPassword} = this.state;

    // get admin authentication from database
    axios.get('admin/getadmin/?admin_id=' + adminID + '&password=' + adminPassword)
      .then(res => {
        this.props.history.push('/departments', res.data.admin);
      })
      .catch(err => { this.setState({ errorMsg: err.response.data.msg }) });
  }
  
  render() {
    //const reqURL = process.env.NODE_ENV === 'production' ? '/items': 'http://localhost:5000/items';
    return (
      <div className="home-login">
        <form onSubmit={this.logIn} className='home-form'>
          <label>Admin ID Number: </label>
          <input 
            type="text" 
            name="adminID" 
            value={this.state.adminID}
            onChange={this.inputChange}
          />
          <br />
          <label>Password: </label>
          <input 
            type="password" 
            name="adminPassword"
            value={this.state.adminPassword}
            onChange={this.inputChange}
          />
          <br />
          <button>Log In</button>
        </form>
        {
          this.state.errorMsg !== '' ?
          <p className="error-msg">{this.state.errorMsg}</p>
          : null
        }
      </div>
    )
  }
}
