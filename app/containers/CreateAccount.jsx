import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';


export default class CreateAccount extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {

		};
	}
	createAccount(){
		var self = this
		fetch('/api/v1/signup', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		})
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			console.log('parsed json', json)
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
	}


  render() {
    return (
      <div>
      	<h1>Create Account</h1>
      		<input type='text' onChange={(e)=>this.setState({email:e.target.value})} placeholder='email' />
      		<input type='text' onChange={(e)=>this.setState({password:e.target.value})} placeholder='password' />
      		<button onClick={this.createAccount.bind(this)}>Submit</button><br/>
      		<h3> Or </h3><br/>
      		<Link to='/Login'>Login</Link>	    
      </div> 


      		
    );
  }
};