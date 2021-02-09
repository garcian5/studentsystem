import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Home from './components/Home';
import Departments from './components/Departments';
import StudentDirectory from './components/StudentDirectory';
import StudentInfo from './components/StudentInfo';
import RegisterStudent from './components/RegisterStudent';
import UpdateStudent from './components/UpdateStudent';

function App() {
  return (
    <div className="App center">
      {/* <header>
        <h1>Welcome to Student Information System</h1>
      </header> */}
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/departments' component={Departments} />
          <Route exact path='/student-directory' component={StudentDirectory} />
          <Route exact path='/student-info' component={StudentInfo} />
          <Route exact path='/student-register' component={RegisterStudent} />
          <Route exact path='/student-update' component={UpdateStudent} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
