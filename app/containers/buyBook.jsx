import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

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
      <div>
      	<h1>Buy This Book:</h1>
        <div>
          {this.state.title} <br/>
          {this.state.author} <br/>
          {this.state.ISBN} <br/>
          {this.state.price} <br/>
          {this.state.condition} <br/>
          {this.state.description} <br/>
        </div>
      </div>
    );
  }
};