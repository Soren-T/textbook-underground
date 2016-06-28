import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import classNames from 'classnames/bind';
import styles from 'css/components/editor';

const cx = classNames.bind(styles);

export default class Editor extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      author: '',
      title: '',
      ISBN: '',
      price: '',
      condition: '',
      description: '',
      _id: ''
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
  submitPost(){
    var self = this
    fetch('/api/v1/books/' + this.props.params._id , {
      credentials: 'same-origin',
      method: 'PUT',
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
  deletePost(){
    console.log('DELETING POST', this.props.params._id)
    var self = this
    fetch('/api/v1/books/' + self.props.params._id, {
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
      browserHistory.push('/SellerHomepage')
    })

  }
  render(){
    var self = this
    return (<div className={cx('body')}>
      <h1>Edit Book</h1>
        <p>Title</p> 
          <input onChange={(e) => this.setState({title : e.target.value})} value={self.state.title} />
        <p>Author</p> 
          <input onChange={(e) => this.setState({author : e.target.value})}  value={self.state.author} />
        <p>ISBN</p> 
          <input onChange={(e) => this.setState({ISBN : e.target.value})}  value={self.state.ISBN} />
        <p>Price</p> 
          <input onChange={(e) => this.setState({price : e.target.value})}  value={self.state.price} />
        <p>Condition</p>
          <p>Current Condition: {this.state.condition}</p>
          <input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'New'})}/> New<br/>
          <input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Like-New'})}/> Like-New<br/>
          <input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Slightly-Used'})}/> Slightly-Used<br/>
          <input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Fair'})}/> Fair<br/>
          <input type="radio" name="Condition" onClick={(e)=>this.setState({condition:'Poor'})}/> Poor<br/>
        <p>Description</p> 
          <textarea onChange={(e) => this.setState({description : e.target.value})}  value={self.state.description} />
        <p>Photo</p>
          <input placeholder="URL" onChange={(e)=>this.setState({photo: e.target.value})} />
        <p>
          <button onClick={this.submitPost.bind(this)}>Update</button>
          <button onClick={this.deletePost.bind(this)}>Delete</button>
        </p>
      </div>)
  }
};