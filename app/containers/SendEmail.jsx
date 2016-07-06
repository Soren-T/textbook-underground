import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/SendEmail';
import _ from 'lodash'
const cx = classNames.bind(styles);

export default class SendEmail extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	fromEmail: '',
	    	subject: '',
	    	content: '',
    	};
  	}

	emailData(){
    var self = this
    var emailData = _.assignIn({},this.state, this.props)
    if(!this.validateEmail(this.state.fromEmail)){
      alert("Your email entry is not valid.")
    }
    else if(!this.state.subject || !this.state.content) {
      alert("Please complete the required fields (subject and content).")
    } else {
  		fetch('/api/v1/sendanemail', {
    	credentials : 'same-origin',
    	method: 'POST',
    	headers: {
    		'Accept': 'application/json',
    		'Content-Type': 'application/json'
    	},
  		body: JSON.stringify(emailData)
  		}).then(function(response) {
  			return response.json()
  		}).catch(function(ex) {
  			console.log('parsing failed', ex)
  		})
      alert("Your email has been sent!")
  	}
  }

  validateEmail(email){
        var filt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return filt.test(email) 
    }

	render(){
        return( 
        	<div className={cx('sendEmailBody')}>
        		<h3>Email the Seller</h3>
        		<p><input className={cx('emailInputs')} placeholder='your email'onChange={(e)=>this.setState({fromEmail:e.target.value})} /></p>	
        		<p><input className={cx('emailInputs')} placeholder='subject' onChange={(e)=>this.setState({subject:e.target.value})} /></p>	
        		<p><textarea className={cx('content')} placeholder='content of the email' onChange={(e)=>this.setState({content:e.target.value})} /></p>
   	  			<button onClick={this.emailData.bind(this)}>send email</button>
        	</div>
        )
	}	
}
