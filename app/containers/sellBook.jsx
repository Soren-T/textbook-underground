import React, { Component, PropTypes } from 'react';
import { refreshLocation } from 'react-router'
import 'whatwg-fetch';
import { browserHistory } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/sellBook';

const cx = classNames.bind(styles);


export default class SellBook extends React.Component {
  constructor(props){
		super(props);
		this.state = {
		};
	}
	submitPost(){
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
  bookLookup(){
    if(!this.state.ISBN && (this.state.ISBN.length!==13 || this.state.ISBN.length!==10)){
      alert('ISBN entry must be 10 or 13 digits')
    } else {
      var self = this
      fetch('/api/v1/books/ISBN/' + self.state.ISBN)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        var book = json
        self.setState({title: book.title})
        self.setState({author: book.authors})
        self.setState({photo: book.imageLinks.thumbnail})
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
    }
  }

  render() {
    return (
      <div className={cx('body')}>
      	<h1>Sell Your Book</h1>
	      	<p>ISBN</p> 
            <input className={cx('number')} type="number" placeholder= '9999999999999' onChange={(e)=>this.setState({ISBN:e.target.value})} />
          <button onClick = {this.bookLookup.bind(this)}>Lookup Book</button> 
          <p>Title</p> 
      			<input placeholder= 'Romeo and Juliet' value={this.state.title} />
      		<p>Author</p> 
      			<input placeholder= 'Shakespeare, William' value={this.state.author} />
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
            <input placeholder="URL" value={this.state.photo} />
      		<button onClick = {this.submitPost.bind(this)}>Submit</button>
      </div>      		
    );
  }
};
