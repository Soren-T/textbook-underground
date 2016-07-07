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
			testPass: "",
			errorMessages: []
		};
	}
	createAccount(){
		var missingFields = []
		if(this.state.email !== this.state.testEmail){
			missingFields.push("Your email entries do not match.")
		}
		else if(this.state.password !== this.state.testPass){
			missingFields.push("Your password entries do not match.")
		} 
		else if(!this.validateEmail(this.state.email)){
			missingFields.push("Your email entry is not valid.")
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
   		this.createAlert(missingFields)    
	}
	validateEmail(email){
    	var filt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return filt.test(email) 
	}
	createAlert(msg){
    	this.setState({errorMessages: this.state.errorMessages.concat(msg)})
  	}
  	displayAlert(msg){
    	return this.state.errorMessages.map((err) => <div className={cx("alerts")}><h2>{err}</h2><br/></div>)
  	}
  	submit(){
  		this.state.errorMessages = []
  		this.createAccount()
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
	      		<button onClick={this.submit.bind(this)}>Submit</button><br/>
	      		<p className={cx('alerts')}>
	      			{this.displayAlert()}
	      		</p>	
	      		<h3> Or </h3><br/>
	      		<Link className={cx('link')} to='/Login'>Login</Link>
	      	</div>	    
	      </div>	      		
	    );
  	}
};