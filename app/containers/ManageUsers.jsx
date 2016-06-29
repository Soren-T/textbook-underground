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
      user:[],
    };
  }
  componentWillMount(){
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
  updateUser(id){
    var email = React.findDOMNode(this.refs.email).value;
    var isBlocked = React.findDOMNode(this.refs.isBlocked).value;
    var self = this
    var data = ({email: email, isBlocked: isBlocked});

    fetch('/api/v1/users/' + id, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    console.log(data)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

   deleteUser(id){
    var self = this
    console.log(id)
    fetch('/api/v1/users/' + id, {
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
  changeBlocked(blocked){
    return !blocked
  }
  changeRoleFalse(blocked){
    return blocked = false
  }

   display(){
      var self = this
      return this.state.user.map(function(user){
        if(!user.local.isAdmin){
        self.state.isBlocked =  user.local.isBlocked
        self.state.email =  user.local.email
          return (<div className={cx('buyerBookList')}>
            <div className={cx('email')}>{user.local.email} </div>
            <div className={cx('isBlocked')}> Block User</div>
              <div>Current status: {user.local.isBlocked.toString()}</div>
              <input ref='email'  /> <br/>
              <input ref='isBlocked' /> <br/>
            <button onClick={() => self.updateUser(user._id)}>Update User</button>
            <button onClick={self.deleteUser.bind(self, user._id)}>Delete User</button>
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