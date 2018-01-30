import React, { Component } from 'react';
import './Input.css';

const APIURL = "//localhost:8081/api/auth/signup";

class SignUp extends Component {
  static defaultProps = {
    onClose() {},
    onSave() {}
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      imageUrl: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(e.target);
    let { email, username, password, imageUrl } = { ...this.state };
    fetch(APIURL, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        email,
        username,
        password,
        imageUrl
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
        // respJSON = resp.json();
        // console.log(respJSON);

        console.log(this.state);
        return resp.json();
        // return respJSON;
      })
      .then(val => {
        console.log(val);
        // let user = val;
        // console.log(user);
        this.props.onSave({ ...val });
      });
    this.setState({
      email: '',
      username: '',
      password: '',
      imageUrl: ''
    })
  }

  render() {
    const { email, username, password, imageUrl } = this.state;
    const { onClose } = this.props;
    return (
      <div className="user-form-container">
        <form className="user-form" onSubmit={ this.handleSubmit }>
          <button
            type="button"
            className="close-button"
            onClick={ onClose }
            >
            X
          </button>
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
            <label htmlFor="user-username">Username</label>
            <input
              id='user-username'
              key='username'
              name='username'
              type='text'
              placeholder='username'
              value={ username }
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
          <div className="user-form-line">
            <label htmlFor="user-img-input">Image Url</label>
            <input
              id='user-imageUrl'
              name='imageUrl'
              type='text'
              placeholder='add link to image'
              value={ imageUrl }
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

export default SignUp;
