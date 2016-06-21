import 'whatwg-fetch';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from '../css/components/home';
import { browserHistory } from 'react-router';
var Collapse = require('rc-collapse');
var Panel = Collapse.Panel;


const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			posts :[],
			text : "",
		};
	}
	componentDidMount(){
		var self = this
		fetch('/api/v1/posts')
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			self.setState({posts: json})
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
	}

	textChange(event){
        this.setState({text: event.target.value})
    }

	compare(){
		var self = this
		if(this.state.text===""){
			return ""
		}
		console.log(this.state.text,this.state.posts)
		return this.state.posts
		 .filter((value) => value.title && value.title.toLowerCase().startsWith(self.state.text.toLowerCase())) 
		 .map((value) => (<div>
		 					<br/>
		 					<BlogItem post = {value}/>
		 				</div>))
	}

	displayBlogs(){
		return this.state.posts.map((post, key)=>
			(<Panel header={post.title}><p className={cx('collapseBody')}>{post.body}</p></Panel>)
		)
	}

  	render() {
		return (
		  <div className={cx('body')}>
		   	<input 
		   		type="text"
		   		name="search" 
		   		value={this.state.text} 
		   		onChange={(event) => {this.textChange(event)}} 
		   		placeholder="Search by Title.." />
		   		<br/>
		   	{this.compare()}
		   	<br/>
		   	<Collapse>
		    		{this.displayBlogs()}
		    </Collapse>
		  </div>
		);
  	}
  
};

class BlogItem extends React.Component{

	render(){
		var self = this
		return (<div>
			<h3>Title: {(this.props.post.title)}</h3>
			<h4> - {(this.props.post.author)}</h4>
			{(this.props.post.body)}<br/>
			<br/>
			<Link to={`/editor/${self.props.post.slug}`} className={cx('item')} activeClassName={cx('active')}>Edit Post</Link>
			<br/>
			</div>)
	}
}
