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

    };
  }

  login(){
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
        password : self.state.password
      })
    }) 
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState(json)
      if(json.success){
        self.props.toggleLogin()
        console.log('json', json)
        browserHistory.push(`/SellerHomepage/`)  //${self.props.params.createdBy}`)
      } else {
        browserHistory.push('/Login')
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  render() {
    return (
      <div className={cx('body')}>
      	<h1>Login</h1>
        <div className={cx('inputGroup')}>
      		<input className={cx('inputBar')} type='text' onChange={(e)=>this.setState({email:e.target.value})} placeholder='email' />
          <br/>
      		<input className={cx('inputBar')} type='text' onChange={(e)=>this.setState({password:e.target.value})} placeholder='password' />
          <br/>
      		<button onClick={this.login.bind(this)}>Login</button>	      	
      </div>
      </div>      		
    );
  }
};