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
			posts :[],
			text : "",
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

	textChange(event){
        this.setState({text: event.target.value})
    }

	compare(){
		var self = this
		if(this.state.text===""){
			return ""
		}
		return this.state.posts
		 .filter((value) => value.title.toLowerCase().startsWith(self.state.text.toLowerCase())) 
		 .map((value) => (<div>
		 					<BlogItem post = {value}/>
		 				</div>))
	}

  	render() {
		return (
		  <div>
		    <h1>Welcome to Soren's Blog</h1>
		   	<input 
		   		type="text"
		   		name="search" 
		   		value={this.state.text} 
		   		onChange={(event) => {this.textChange(event)}} 
		   		placeholder="Search.." />
		   	{this.compare()}
		    <div>
		    	{this.state.posts.map((post)=><div>
		    	Title: {(post.title)}<br/>
		    	Written By: {(post.author)}<br/>
		    	{(post.body)}<br/>
		    	<br/>
		    	</div>)}
		    </div>
		  </div>
		);
  	}
  
};

class BlogItem extends React.Component{
	deletePost(){
		console.log('DELETING POST', this.props)
		var self = this
		fetch('api/v1/posts/'+self.props.post.slug, {
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
		})

	}
	render(){
		var self = this
		return (<div>
			{(this.props.post.title)}<br/>
			{(this.props.post.author)}<br/>
			{(this.props.post.body)}<br/>
			<button onClick={self.deletePost.bind(self)}>Delete</button><br/>
			<br/>
			</div>)
	}
}
