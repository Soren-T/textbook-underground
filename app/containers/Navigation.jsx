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

  logStatus (){
  	if(this.props.loggedIn){
  		return (<div>
                <Link className={cx('item')} onClick={this.props.toggleLogin} to="/Login">Logout</Link>
                <Link className={cx('item')} to={`/SellerHomepage/`}>My Account</Link>
              </div>)

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