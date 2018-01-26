import React from 'react';
// import NavBar from './NavBar.css';

const NavBar =(props)=> {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      margin: "20px",
      padding: "5px",
      backgroundColor: "grey"
    }}>
      <h3>Warbler Signed In: { props.signedIn }</h3>
      <span
        className="signUp"
        style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
        <button style={{
          margin: "20px"
        }}
          onClick={ props.clickSignIn }
          >Sign In
        </button>
        <button
          style={{
           margin: "20px"
         }}
          onClick={ props.clickSignUp }
          >Sign Up
        </button>
      </span>
    </div>
  )
}

export default NavBar;
