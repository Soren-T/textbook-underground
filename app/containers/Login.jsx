import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import 'whatwg-fetch';
import {browserHistory} from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/loginCreateAccnt';


const cx = classNames.bind(styles);

export default class Login extends React.Component {
	constructor(props){
    super(props);
    this.state = {
      errorMessages: []
    };
  }

  loginAuth(){
    var missingFields = []
    var self = this
    fetch('/api/v1/login', {
      credentials : 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email : self.state.email,
        password : self.state.password,
        isAdmin : self.state.isAdmin,
        isBlocked : self.state.isBlocked,
      })
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState(json)
      if(json.user.local.isAdmin){
        self.props.toggleLogin()
        browserHistory.push(`/AdminPage/`)
      }
      else if(json.user.local.isBlocked){
        missingFields.push("Your account has been banned. Please contact Admin at: admin@admin.com.")
        browserHistory.push(`/Login/`)
      }
      else if(json.success){
        self.props.toggleLogin()
        browserHistory.push(`/SellerHomepage/`)
      }
    }).catch(function(ex) {
      missingFields.push("Your email/password entry is incorrect.")
      browserHistory.push(`/Login/`)
      console.log('parsing failed', ex)
    })
    this.createAlert(missingFields)
  }
  createAlert(msg){
    this.setState({errorMessages: this.state.errorMessages.concat(msg)})
  }
  displayAlert(msg){
    return this.state.errorMessages.map((err) => <div className={cx("loginAlerts")}><h2>{err}</h2><br/></div>)
  }
  login(){
    this.state.errorMessages = []
    this.loginAuth()
  }
  render() {
    return (
      <div className={cx('loginBody')}>
      	<h1>Login</h1>
        <div className={cx('inputGroup')}>
      		<input className={cx('inputBar')} type='text' onChange={(e)=>this.setState({email:e.target.value})} placeholder='email' />
          <br/>
      		<input className={cx('inputBar')} type='password' onChange={(e)=>this.setState({password:e.target.value})} placeholder='password' />
          <br/>
      		<button onClick={this.login.bind(this)}>Login</button>
          <p className={cx('loginAlerts')}>
              {this.displayAlert()}
            </p>  
          <h3> Or </h3><br/>
          <Link className={cx('link')} to='/CreateAccount'>Create an Account</Link>
      </div>
      </div>      		
    );
  }
};