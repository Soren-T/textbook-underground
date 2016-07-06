import React, { Component, PropTypes } from 'react';
import { refreshLocation } from 'react-router'
import 'whatwg-fetch';
import { browserHistory } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/sellBook';
import _ from 'lodash';

const cx = classNames.bind(styles);


export default class SellBook extends React.Component {
  constructor(props){
		super(props);
		this.state = {
      errorMessages: []
		};
	}
  submitPost(){
    fetch('/api/v1/books', {
    credentials : 'same-origin',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(this.state)
    }).then(function(response) {
      return response.json()
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    }).then(function() {
      browserHistory.push('/SellerHomepage')
    })
  }
	checkField(){
    this.state.errorMessages = []
    console.log(this.state.errorMessages)
    if(this.missField()){
      this.submitPost()
    } 
	}
  missField(){
    var self = this
    var valid = true
    var missingFields = []
    if(!this.state.ISBN){
      missingFields.push("You are missing the ISBN")
      valid = false
    } 
    if(!this.state.title){
      missingFields.push("You are missing the title")
      valid = false
    }
    if(!this.state.author){
      missingFields.push("You are missing the author")
      valid = false
    }
    if(!this.state.price){
      missingFields.push("You are missing the price")
      valid = false
    }
    if(!this.state.condition){
      missingFields.push("You are missing the condition")
      valid = false
    }
    if(!this.state.description){
      missingFields.push("You are missing the description")
      valid = false
    }
    this.createAlert(missingFields)
    return valid
  }
  bookLookup(){
    this.state.errorMessages = []
    if(!this.state.ISBN || (this.state.ISBN.length!==13 && this.state.ISBN.length!==10)){
      alert('ISBN entry must be 10 or 13 digits')  
    } else {
      var self = this
      fetch('/api/v1/books/ISBN/' + self.state.ISBN)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        if(json.found===false){
         self.createAlert("No books match this ISBN.")
        } else {
          var book = json
          self.setState({title: book.title})
          self.setState({author: book.authors})
          self.setState({photo: book.imageLinks.thumbnail})
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    }
  }

  createAlert(msg){
    this.setState({errorMessages: this.state.errorMessages.concat(msg)})
  }
  displayAlert(msg){
    return this.state.errorMessages.map((err) => <span><h2>{err}</h2><br/></span>)
  }

  render() {
    return (
      <div className={cx('sellBookBody')}>
      	<h1>Sell Your Book</h1>
          {this.displayAlert()}
	      	<p>ISBN</p> 
            <input className={cx('number')} type="number" placeholder= '9999999999999' onChange={(e)=>this.setState({ISBN:e.target.value})} />
          <button onClick = {this.bookLookup.bind(this)}>Lookup Book</button> 
          <p>Title</p> 
      			<input placeholder= 'Romeo and Juliet' value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})} />
      		<p>Author</p> 
      			<input placeholder= 'Shakespeare, William' value={this.state.author} onChange={(e)=>this.setState({author:e.target.value})} />
      		<p>Price</p> 
      			<input className={cx('number')} type="number" placeholder= '00.00' onChange={(e)=>this.setState({price:e.target.value})} />	
      		<p>Condition</p>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'New'})}/> New<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Like-New'})}/> Like-New<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Slightly-Used'})}/> Slightly-Used<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Fair'})}/> Fair<br/>
      			<input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Poor'})}/> Poor<br/>
      		<p>Description</p> 
      			<textarea className={cx('inputTextArea')} placeholder= 'This is a really great book. It was used in Theater 101, and it has a slightly worn cover.' onChange={(e)=>this.setState({description:e.target.value})} /><br/> 
          <p>Photo</p>
            <input placeholder="URL" value={this.state.photo} onChange={(e)=>this.setState({photo:e.target.value})} />
      		<button onClick = {this.checkField.bind(this)}>Submit</button>
      </div>      		
    );
  }
};
