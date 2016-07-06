import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/SellerHomepage';
import {browserHistory} from 'react-router';
import User from './User'

const cx = classNames.bind(styles);


export default class ManageUsers extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:[],
    };
  }
  componentWillMount(){
    this.refreshUsers()
  }

  refreshUsers(){
    var self = this
    fetch('/api/v1/users/')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState({user:json})
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

   display(){
      return this.state.user.map((user, index) =>
           (<User key={index} isBlocked={user.local.isBlocked} isAdmin={user.local.isAdmin} email={user.local.email} id={user._id} refreshUsers={this.refreshUsers.bind(this)}/>)
    )}

  render() {
    return (
      <div className={cx('manageUsersBody')}>
      	<h1>Manage Users</h1>
          <br/>
          <div>
            {this.display()}
          </div>
      </div> 	
    );
  }
};