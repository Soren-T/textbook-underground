import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';




export default class Login extends React.Component {
	

  render() {
    return (
      <div>
      	<h1>Login</h1>
      		<input type='text' onChange={(e)=>this.setState({email:e.target.value})} placeholder='email' />
      		<input type='text' onChange={(e)=>this.setState({password:e.target.value})}placeholder='password' />
      		<Link to='/SellerHomepage'> Login </Link>	      	
      </div> 


      		
    );
  }
};