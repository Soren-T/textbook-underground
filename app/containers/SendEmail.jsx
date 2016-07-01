import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/buyBook';

const cx = classNames.bind(styles);

export default class SendEmail extends React.Component {
	constructor(props){
	    super(props);
	    this.state = {
	    	toEmail: '',
	    	fromEmail: '',
	    	subject: '',
	    	content: '',
    	};
  	}

  	emailData(){
  		var self = this
  		console.log(this.state)
	    fetch('/api/v1/sendanemail', {
			credentials : 'same-origin',
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		})
		.then(function(response) {
			return response.json()
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
  	}

	 emailSeller(){
	 	this.setState({toEmail: this.props.sellerEmail})
	 	this.emailData()
	 }
	render(){
        return( 
        	<div>
        		<p><input onChange={(e)=>this.setState({fromEmail:e.target.value})} /></p>	
        		<p><input onChange={(e)=>this.setState({subject:e.target.value})} /></p>	
        		<p><input onChange={(e)=>this.setState({content:e.target.value})} /></p>	
	  			<button onClick={this.emailSeller.bind(this)}>Email the Seller</button>
        	</div>
        )
	}	
}
