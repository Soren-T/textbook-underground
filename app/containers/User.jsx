import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/SellerHomepage';
import {browserHistory} from 'react-router';

const cx = classNames.bind(styles);

export default class User extends React.Component{

  changeBlockStatus(isBlocked){
    var self = this;
    var data = {'local.isBlocked' : isBlocked}
    fetch('/api/v1/users/' + this.props.id, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.props.refreshUsers()
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  hideBook(hidden){
    var self = this;
    var data = {'hidden' : hidden}
    fetch('/api/v1/books/createdBy/' + this.props.id, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.props.refreshUsers()
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  deleteUserInfo(){
    var self = this
    console.log(this.props.id)
    fetch('/api/v1/users/' + this.props.id, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.props.refreshUsers()
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  deleteUserBooks(id){
    fetch('/api/v1/books/createdBy/' + id, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('success deleting book')
      self.props.refreshUsers()
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    }).then(function() {
      window.location.reload()
    })
  }
  deleteUser(id){
    if(confirm('Are you sure you want to delete this user?\nAll of their listings will be deleted.')){
      this.deleteUserInfo()
      this.deleteUserBooks(id)
    }
  }

  blockUser(isBlocked, hidden){
    if(confirm('Are you sure you want to block this user?\nAll of their listings will be hidden.')){
      this.changeBlockStatus(isBlocked)
      this.hideBook(hidden)
    }
  }
   
  render(){
    return (<div className={cx('buyerBookList')}>
      <div className={cx('email')}>{this.props.email} </div>
      <div className={cx('isBlocked')}> Block User</div>
      <div>Current status: {this.props.isBlocked.toString()}</div>
      <input type='hidden' ref='email' value={this.props.email}  /> <br/>
      <button ref='isBlocked' value={this.props.isBlocked} onClick={this.blockUser.bind(this, !this.props.isBlocked, !this.props.isBlocked)}>{this.props.isBlocked ? 'Unblock User' : 'Block User'}  </button>
      <button onClick={this.deleteUser.bind(this, this.props.id)}>Delete User</button>
      <br/>
    </div>)
  }
}