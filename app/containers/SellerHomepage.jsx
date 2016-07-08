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
      self.setState({books:json})
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  render() {
    return (
      <div className={cx('sellerHomepageBody')}>
      	<h1>Seller Homepage</h1>
      		<br/>
        <div className={cx('buyerBooks')}>
        <h2>Your current list of books for sale.</h2>
          <p>To add a book listing, click on the menu bar and select "Sell Your Books". Any book you list will be available for 30 days. After that date you will need to re-activate this listing.</p>
          <div>
            {this.state.books.map((book)=>(
              <div className={cx('buyerBookList')}>
                <div className={cx('bookContainer')}>
                  <div className={cx('photo')}><img src={book.photo}/> </div>
                  <div className={cx('bookDetails')}>
                    <div className={cx('title')}>  {book.title} </div>
                    <div className={cx('author')}>by {book.author} </div>
                    <div className={cx('ISBN')}>ISBN: {book.ISBN} </div>
                    <div className={cx('price')}>${book.price} </div>
                    <div className={cx('condition')}>Condition: {book.condition} </div>
                    <div className={cx('description')}>Description: <br/> {book.description} </div>
                  </div>
                </div>
                <div className={cx('editBtn')}>
                  <Link className={cx('editLink')} to={`/Editor/${book._id}`}>Edit Post</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> 	
    );
  }
};