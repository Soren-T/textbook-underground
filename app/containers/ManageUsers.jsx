import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/SellerHomepage';
import {browserHistory} from 'react-router';

const cx = classNames.bind(styles);

export default class ManageUsers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:[]
    };
  }
  componentWillMount(){
    var self = this
    fetch('/api/v1/users/')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState({user:json})
      console.log(self.state)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  updateUser(){
    var self = this
    fetch('/api/v1/users/' + this.props.params.email, {
      credentials: 'same-origin',
      method: 'PUT',
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

   deleteUser(email){
    var self = this
    fetch('/api/v1/users/' + email, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    }).then(function() {
      window.location.reload()
    })
  }

   display(){
      var self = this
      return this.state.user.map(function(user){
        if(!user.local.isAdmin){
          return (<div className={cx('buyerBookList')}>
            <div className={cx('email')}>{user.local.email} </div>
            <div className={cx('isAdmin')}>{user.local.isAdmin} isAdmin </div>
              <input type="radio" name="isAdminRadio" /> True<br/>
              <input type="radio" name="isAdminRadio" /> False<br/>
            <div className={cx('isBlocked')}>{user.local.isBlocked} isBlocked </div>
              <input type="radio" name="isBlockedRadio" /> True<br/>
              <input type="radio" name="isBlockedRadio" /> False<br/> 
            <button onClick={this.updateUser.bind(this)}>Update</button>
            <button onClick={self.deleteUser.bind(this, user.local.email)}>Delete User</button>
            <br/>
          </div>)
        }
      })
    }

  render() {
    return (
      <div className={cx('body')}>
      	<h1>Manage Users</h1>
          <br/>
          <div>
            {this.display()}
          </div>
      </div> 	
    );
  }
};