import React, { Component, PropTypes } from 'react';
import Navigation from 'containers/Navigation';

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
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  componentDidMount(){
    this.getUserData()
  }

  getUserData(){
    var self = this
    fetch('/api/v1/user',
     {credentials: 'same-origin'})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState(json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  toggleLogin(){
    this.setState({loggedIn:!this.state.loggedIn})
    if(this.state.loggedIn){
      this.getUserData()
    } else {
      this.setState({user: ''})
    }
  }

  render() {
    return (
      <div className={cx('app')}>
      	<h1>Textbook Underground</h1>
      	   <Navigation loggedIn={this.state.loggedIn} user={this.state.user} toggleLogin={this.toggleLogin.bind(this)}/>
           {this.props.children && React.cloneElement(this.props.children,{toggleLogin:this.toggleLogin.bind(this)})}
      </div>
    );
  }
};

App.propTypes = {
  children: PropTypes.object
};