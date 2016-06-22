import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


export default class CreateAccount extends React.Component {
	

  render() {
    return (
      <div>
      	<h1>Create Account</h1>
      		<input type='text' placeholder='email' />
      		<input type='text' placeholder='password' />
      		<Link to='/Login'>Submit</Link><br/>
      		<h3> Or </h3><br/>
      		<Link to='/Login'>Login</Link>	    
      </div> 


      		
    );
  }
};