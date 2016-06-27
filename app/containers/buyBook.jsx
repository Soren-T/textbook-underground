import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/buyBook';


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
      description: ''
    };
  }
  componentWillMount(){
    var self = this
    console.log(this.state.params)
    fetch('/api/v1/books/'+this.props.params._id)
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('here is the json', json)
      self.setState(json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    })
  }
  render() {
    return (
      <div className={cx('body')}>
      	<h1>Buy This Book:</h1>
        <div className={cx('results')}>
          <p className={cx('photo')}><img src={this.state.photo}/> </p>
          <p className={cx('title')}>{this.state.title} </p>
          <p className={cx('author')}>by {this.state.author} </p>
          <p className={cx('ISBN')}>ISBN: {this.state.ISBN} </p>
          <p className={cx('price')}>${this.state.price} </p>
          <p className={cx('condition')}>Condition: {this.state.condition} </p>
          <p className={cx('description')}>Description: <br/>{this.state.description} </p>
        </div>
      </div>
    );
  }
};