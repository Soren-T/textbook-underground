import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import classNames from 'classnames/bind';
import styles from 'css/components/home';

const cx = classNames.bind(styles);

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
    	books : [],
    	text : '',
    	_id: ''
    };
  }

  componentDidMount(){
	var self = this
	fetch('/api/v1/books')
	.then(function(response) {
		return response.json()
	}).then(function(json) {
		self.setState({books: json})
	}).catch(function(ex) {
		console.log('parsing failed', ex)
	})
  }

  compare(){
	var self = this
	if(this.state.text===""){
		return ""
	}
	return this.state.books
	.filter((value) => 
		 value.title && value.title.toLowerCase().includes(self.state.text.toLowerCase())
		|| value.author && value.author.toLowerCase().includes(self.state.text.toLowerCase()) 
		|| value.ISBN && value.ISBN.toLowerCase().includes(self.state.text.toLowerCase())
	)
	.map((value) => 
	 	(
	 	<li key= {value._id}>
	 		{value.hidden ? '' : 
	 		<Link className={cx('results')} to={`/buyBook/${value._id}`}>
	 			<div className={cx('photo')}><img src={value.photo}/></div>
			 	<div className={cx('title')}>{value.title}</div>
			 	<div className={cx('author')}>by {value.author}</div> 
			 	<div className={cx('ISBN')}>ISBN: {value.ISBN}</div> 
			 	<div className={cx('price')}>${value.price}</div> 
			 	<div className={cx('condition')}>Condition: {value.condition}</div>
			 	<div className={cx('description')}>Description: <br/>{value.description}</div> <br/>
			 </Link>
			}
	    </li>
	    )
    )
  }

  textChange(event){
    this.setState({text: event.target.value})
  }
  
  render() {
    return (
      <div className={cx('body')}>
        <h1>Stick it to the Universe(ity)!</h1>
        <input 
        	className={cx('searchBar')}
	   		type="text"
	   		name="search" 
	   		value={this.state.text} 
	   		onChange={(event) => {this.textChange(event)}} 
	   		placeholder="Title, Author, ISBN" />
	   		<br/>
	   	<ul>{this.compare()}</ul>
      </div>
    );
  }
};
