import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';



export default class SellerHomepage extends React.Component {
  constructor(props){
    super(props);
    this.state = {books:[]};
  }
  componentWillMount(){
    var self = this
    fetch('/api/v1/books/user', {credentials: 'same-origin'})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('here is the json', json)
      self.setState({books:json})
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  render() {
    console.log('SSTEATE', this.state)
    return (
      <div>
      	<h1>Seller Homepage</h1>
      		<Link to='/sellBook'>Add a new listing </Link><br/>
          <br/>
          <div>
          {this.state.books.map((book)=>(<div>
            {book.title} <br/>
            {book.author} <br/>
            {book.ISBN} <br/>
            {book.price} <br/>
            {book.condition} <br/>
            {book.description} <br/>
            <br/>
          </div>))} 

        </div>
      </div> 	
    );
  }
};