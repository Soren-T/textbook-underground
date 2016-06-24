import React, { Component, PropTypes } from 'react';
import { refreshLocation } from 'react-router'
import 'whatwg-fetch';
import { browserHistory } from 'react-router';


export default class SellBook extends React.Component {
  constructor(props){
		super(props);
		this.state = {
		};
	}
	submitPost(){
		console.log(this.state.createdBy)
		var self = this
		fetch('/api/v1/books', {
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
		}).then(function(json) {
			console.log('parsed json', json)
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		}).then(function() {
      		browserHistory.push('/SellerHomepage')
   		})   
	}

  render() {
    return (
      <div>
      	<h1>Sell Your Book</h1>
	      	<p>Title</p> 
      			<input onChange={(e)=>this.setState({title:e.target.value})} />
      		<p>Author</p> 
      			<input onChange={(e)=>this.setState({author:e.target.value})} />
      		<p>ISBN</p> 
      			<input onChange={(e)=>this.setState({ISBN:e.target.value})} />	
      		<p>Price</p> 
      			<input onChange={(e)=>this.setState({price:e.target.value})} />	
      		<p>Condition</p>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'New'})}/> New<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Like-New'})}/> Like-New<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Slightly-Used'})}/> Slightly-Used<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Fair'})}/> Fair<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Poor'})}/> Poor<br/>
      		<p>Description</p> 
      			<textarea onChange={(e)=>this.setState({description:e.target.value})} /><br/> 
      		<button onClick = {this.submitPost.bind(this)}>Submit</button>
      </div>      		
    );
  }
};
