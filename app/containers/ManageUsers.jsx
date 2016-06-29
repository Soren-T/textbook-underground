import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/SellerHomepage';
import {browserHistory} from 'react-router';


const cx = classNames.bind(styles);



class User extends React.Component{
    updateUser(){
      console.log(React.findDOMNode(this.refs.email))
    var email = React.findDOMNode(this.refs.email).value;
    var isBlocked = React.findDOMNode(this.refs.isBlocked).value;
    var self = this
    console.log('is Blocked', isBlocked);
    console.log('email', email);
    var data = {email: email, isBlocked: isBlocked};

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
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  deleteUser(){
    var self = this
    console.log(id)
    fetch('/api/v1/users/' + this.props._id, {
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

  render(){
        return (<div className={cx('buyerBookList')}>
          <div className={cx('email')}>{this.props.email} </div>
          <div className={cx('isBlocked')}> Block User</div>
          <div>Current status: {this.props.isBlocked.toString()}</div>
          <input ref='email'  /> <br/>
          <input ref='isBlocked'/> <br/>
          <button onClick={() => this.updateUser()}>Update User</button>
          <button onClick={this.deleteUser.bind(this)}>Delete User</button>
          <br/>
        </div>)

  }

}
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



  changeBlocked(blocked){
    return !blocked
  }
  changeRoleFalse(blocked){
    return blocked = false
  }

   display(){
      return this.state.user.map((user) =>
           (<User isBlocked={user.local.isBlocked} isAdmin={user.local.isAdmin} email={user.local.email} id={user._id} />)
    )}

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