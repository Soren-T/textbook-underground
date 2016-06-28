import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';


const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
export default class Navigation extends Component {
  constructor(props){
    super(props)
    this.state = {
      createdBy : ''
    }
  }
  logOut (){
    var self = this
    fetch('/api/v1/logout', {
      credentials : 'same-origin',
      method: 'POST',
    }) 
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      if(json.loggedOut){
        self.props.toggleLogin()
      }
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  logStatus (){
    var self = this
  	if(this.props.loggedIn){
        if(self.props.user.local.isAdmin){
          return (<span>
                <Link className={cx('item')} onClick={this.logOut.bind(this)} to="/Login">Logout</Link>
                <Link className={cx('item')} to={`/AdminPage/`}>Manage Listings</Link>
                <Link className={cx('item')} to={`/ManageUsers/`}>Manage Users</Link>
              </span>)
        } else {
  		      return (<span>
                <Link className={cx('item')} onClick={this.logOut.bind(this)} to="/Login">Logout</Link>
                <Link className={cx('item')} to={`/SellerHomepage/`}>My Account</Link>
              </span>)
            }
  	} else {
  		return (<Link className={cx('item')} to="/Login">Login</Link>)
  	}
  }
  render() {
    return (
      <div className={cx('navigation')}>
        <Link className={cx('item')} to='/CreateAccount'>Sell Your Book</Link>
        <Link className={cx('item')} to='/'>Home</Link>
        {this.logStatus()}
      </div>
    );
  }
};