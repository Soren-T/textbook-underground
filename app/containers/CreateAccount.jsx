import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';
import classNames from 'classnames/bind';
import styles from 'css/components/loginCreateAccnt';
import { browserHistory } from 'react-router';

const cx = classNames.bind(styles);

export default class CreateAccount extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			testEmail: "",
			testPass: ""
		};
	}
	createAccount(){
		if(this.state.email !== this.state.testEmail){
			alert("Your email entires do not match")
		}
		else if(this.state.password !== this.state.testPass){
			alert("Your password entires do not match")
		} 
		else if(!this.validateEmail(this.state.email)){
			alert("Your email entry is not valid")
		}
		else {
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
			}).catch(function(ex) {
				console.log('parsing failed', ex)
			}).then(function() {
	      		browserHistory.push('/Login')
	   		})
   		}    
	}
	validateEmail(email){
    	var filt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return filt.test(email) 
	}

  	render() {
	    return (
	      <div className={cx('createAccountBody')}>
	      	<h1>Create Account</h1>
	      	<div className={cx('inputGroup')}>
	      		<input className={cx('inputBar')} type='text' onChange={(e)=>this.setState({testEmail:e.target.value})} placeholder='email' />
	      		<br/>
	      		<input className={cx('inputBar')} type='text' onChange={(e)=>this.setState({email:e.target.value})} placeholder='verify email' />
	      		<br/>
	      		<input className={cx('inputBar')} type='password' onChange={(e)=>this.setState({testPass:e.target.value})} placeholder='password' />
	      		<br/>
	      		<input className={cx('inputBar')} type='password' onChange={(e)=>this.setState({password:e.target.value})} placeholder='verify password' />
	      		<br/>
	      		<button onClick={this.createAccount.bind(this)}>Submit</button><br/>
	      		<h3> Or </h3><br/>
	      		<Link className={cx('link')} to='/Login'>Login</Link>
	      	</div>	    
	      </div>	      		
	    );
  	}
};