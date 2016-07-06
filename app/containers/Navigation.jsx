import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';
import _ from 'lodash';

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
        if(_.get(self.props, 'user.local.isAdmin', false)){
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
  sellBookLink(){
    if(this.props.loggedIn){
      return (<Link className={cx('item')} to='/sellBook'>Sell Your Books</Link>)
    } else {
      return (<Link className={cx('item')} to='/CreateAccount'>Sell Your Books</Link>)
    }
  }
  render() {
    return (
      <div className={cx('navigation')}>
        {this.sellBookLink()}
        <Link className={cx('item')} to='/'>Buy Books</Link>
        {this.logStatus()}
      </div>
    );
  }
};