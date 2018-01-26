import React, { Component } from 'react';
import Input from './Input.css';

const APIURL = "//localhost:8081/api/auth/signin";

class SignIn extends Component {
  static defaultProps = {
    onSave() {}
  }

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(e.target);
    let { email, password } = { ...this.state };
    fetch(APIURL, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(resp => {
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = { errorMessage: data.message }
              throw err;
            })
          } else {
            let err = { errorMessage: "Please Try Again Later, Server Is NOT Responding." }
            throw err;
          }
        }
        console.log(resp);
        return resp.json();
      })
      .then(val => {
        console.log(val);
        this.props.onSave({ ...val });
      });
      this.setState({
        email: '',
        password: ''
      })
  }
  render() {
    const { email, password } = { ...this.state };
    return (
      <div className="user-form-container">
        <form className="user-form" onSubmit={ this.handleSubmit }>
          <div className="user-form-line">
            <label htmlFor="user-email">Email</label>
            <input
              id='user-email'
              key='email'
              name='email'
              type='text'
              placeholder='email'
              value={ email }
              size={ 20 }
              autoComplete="off"
              onChange={ this.handleChange } />
          </div>
          <div className="user-form-line">
            <label htmlFor="user-password">Password</label>
            <input
              id='user-password'
              key='password'
              name='password'
              type='password'
              placeholder='password'
              value={ password }
              size={ 20 }
              autoComplete="off"
              onChange={ this.handleChange } />
          </div>
          <button
            type="submit"
            className="buttons"
            style={{ alignSelf: 'flex-end', marginRight: 0 }}
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default SignIn;
