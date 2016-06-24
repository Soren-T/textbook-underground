import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/SellerHomepage';

const cx = classNames.bind(styles);

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
    return (
      <div>
      	<h1>Seller Homepage</h1>
      		<Link className={cx('link')} to='/sellBook'>Add a new listing </Link><br/>
          <br/>
          <div>
          {this.state.books.map((book)=>(<div className={cx('buyerBookList')}>
           <p>  {book.title} </p>
           <p>  {book.author} </p>
           <p>  {book.ISBN} </p>
           <p>  {book.price} </p>
           <p>  {book.condition} </p>
           <p>  {book.description} </p>
            <Link className={cx('link')} to={`/Editor/${book._id}`}>Edit Post</Link>
            <br/>
          </div>))} 
        </div>
      </div> 	
    );
  }
};