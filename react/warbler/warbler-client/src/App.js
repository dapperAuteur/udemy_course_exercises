import React, { Component } from 'react';
import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showSignIn: false,
      showSignUp: false,
      signedIn: false,
      user: {},
    }
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(user) {
    console.log(user);
    // let signedInUser = user;
    this.setState({
      user,
      signedIn: true
    });
    console.log(this.state);
  }

  render() {
    const { showSignIn, showSignUp } = this.state;
    return (
      <div className="App">
        <NavBar signedIn={ this.state.signedIn }
          clickSignIn={ () => this.signIn({
            showSignIn: true,
            showSignUp: false
          }) }
          clickSignUp={ () => this.signUp({
            showSignUp: true,
            showSignIn: false
          }) }
        />
        <SignUp
          onSave={ this.handleSave }
          />
        <SignIn
          onSave={ this.handleSave }
          />
        <h1>Current User: { this.state.user.username }</h1>
      </div>
    );
  }
}

export default App;
