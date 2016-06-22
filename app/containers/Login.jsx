import React, { Component, PropTypes } from 'react';



export default class Login extends React.Component {
	

  render() {
    return (
      <div>
      	<h1>Login</h1>
      		<input type='text' placeholder='email' />
      		<input type='text' placeholder='password' />
      		<button>Login</button>	      	
      </div> 


      		
    );
  }
};