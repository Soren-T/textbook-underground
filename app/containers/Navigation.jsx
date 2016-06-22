import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/main';

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

  logStatus (){
  	if(this.props.loggedIn){
  		return (<Link onClick={this.props.toggleLogin} to="/Login">Logout</Link>)
  	} else {
  		return (<Link to="/Login">Login</Link>)
  	}
  }
  render() {
    return (
      <div>
        <Link to='/CreateAccount'>Sell Your Book</Link>
        <br/>
        <Link to='/'>Home</Link>
        <br/>
        {this.logStatus()}
      </div>
    );
  }
};