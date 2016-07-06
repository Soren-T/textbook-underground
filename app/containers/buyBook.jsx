import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/buyBook';
import SendEmail from './SendEmail';

const cx = classNames.bind(styles);

export default class buyBook extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      author: '',
      title: '',
      ISBN: '',
      price: '',
      condition: '',
      description: '',
      sellerEmail: ''
    };
  }

  componentWillMount(){
    var self = this
    fetch('/api/v1/books/'+this.props.params._id)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      self.setState(json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }

  display(){
    return (
      <div>
        <SendEmail sellerEmail={this.state.sellerEmail} />
      </div>
    )
  }

  render() {
    return (
      <div className={cx('buyBookBody')}>
      	<h1>Buy This Book:</h1>
        <div className={cx('results')}>
          <div className={cx('photo')}><img src={this.state.photo}/> </div>
          <div className={cx('title')}>{this.state.title}</div>
          <div className={cx('author')}>by {this.state.author}</div>
          <div className={cx('ISBN')}>ISBN: {this.state.ISBN} </div>
          <div className={cx('price')}>${this.state.price} </div>
          <div className={cx('condition')}>Condition: {this.state.condition} </div>
          <div className={cx('description')}>Description: <br/>{this.state.description} </div>
          <div>{this.display()}</div>
        </div>
      </div>
    );
  }
};