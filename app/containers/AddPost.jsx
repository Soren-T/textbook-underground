import React from 'react';

import classNames from 'classnames/bind';
import styles from 'css/components/home';
import 'whatwg-fetch';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class AddPost extends React.Component {
	constructor(props){
		super(props);
		this.state = {

		};
	}
	submitPost(){
		fetch('/api/v1/posts', {
			method: 'POST',
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
		})
	}

  	render() {
	    return (
	      <div className={cx('home')}>
	        <h1 className={cx('home__header')}>Welcome to Soren's Blog!</h1>
	      		<p>Title</p> 
	      			<input onChange={(e)=>this.setState({title:e.target.value})} />
	      		<p>Slug</p> 
	      			<input onChange={(e)=>this.setState({slug:e.target.value})} />
	      		<p>Body</p> 
	      			<textarea onChange={(e)=>this.setState({body:e.target.value})} />
	      		<p>
	      			<button onClick={this.submitPost.bind(this)}>Submit</button>
	      		</p>
	      </div>
	    );
  	}
  
};
