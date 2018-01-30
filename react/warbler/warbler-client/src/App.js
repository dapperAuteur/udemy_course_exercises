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

  componentWillUpdate=() => {
    console.log(this.state);
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
    let signUp = null;
    let signIn = null;
    if (showSignUp) {
      signUp = <SignUp
        onSave={ this.handleSave }
        />
    }
    if (showSignIn) {
      signIn = <SignIn
        onSave={ this.handleSave }
        />
    }
    return (
      <div className="App">
        <NavBar signedIn={ this.state.signedIn }
          clickSignIn={ () => this.setState({
            showSignIn: !showSignIn
          }) }
          clickSignUp={ () => this.setState({
            showSignUp: !showSignUp
          }) }
        />
      { signUp }
      { signIn }
        <h1>Current User: { this.state.user.username }</h1>
      </div>
    );
  }
}

export default App;
