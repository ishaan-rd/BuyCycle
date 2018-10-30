import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import SignUp from './Signup';
import SignIn from './SignIn';

class App extends Component {
  render() {
      return (
    <Router>
      <div>


        <hr/>

    
        <Route
          exact path='/Signup'
          component={() => <SignUp />}
        />
        <Route
          exact path='/SignIn'
          component={() => <SignIn />}
        />

      </div>
    </Router>

      );
    }
}

export default App;
