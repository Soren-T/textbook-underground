import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/SellerHomepage';
import {browserHistory} from 'react-router';

const cx = classNames.bind(styles);

export default class AdminPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      books:[],
      _id: ''
    };
  }
  componentWillMount(){
    var self = this
    fetch('/api/v1/books/')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState({books:json})
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

   deletePost(id){
    var self = this
    console.log(self.state)
    fetch('/api/v1/books/' + id, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    }).then(function() {
      window.location.reload()
    })
  }
  render() {
    return (
      <div className={cx('body')}>
      	<h1>Admin Page</h1>
          <br/>
          <div>
          {this.state.books.map((book)=>(<div className={cx('buyerBookList')}>
           <div className={cx('photo')}><img src={book.photo}/> </div>
           <div className={cx('title')}>  {book.title} </div>
           <div className={cx('author')}>by {book.author} </div>
           <div className={cx('ISBN')}>ISBN: {book.ISBN} </div>
           <div className={cx('price')}>${book.price} </div>
           <div className={cx('condition')}>Condition: {book.condition} </div>
           <div className={cx('description')}>Description: <br/> {book.description} </div>
           <button onClick={this.deletePost.bind(this, book._id)}>Delete</button>
            <br/>
          </div>))} 
        </div>
      </div> 	
    );
  }
};