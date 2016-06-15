import React from 'react';
import 'whatwg-fetch';

/*
 * Note: This is kept as a container-level component, 
 *  i.e. We should keep this as the container that does the data-fetching 
 *  and dispatching of actions if you decide to have any sub-components.
 */
export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			posts:[],
		};
	}
	componentWillMount(){
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

  	render() {
		return (
		  <div>
		    <h1>Home Page</h1>
		    <ul>{this.state.posts.map((post)=><li>{(post.title)}<br/>{(post.author)}<br/>{(post.body)}</li>)}</ul>
		  </div>
		);
  	}
  
};
