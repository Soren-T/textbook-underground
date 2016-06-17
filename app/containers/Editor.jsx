import React from 'react';
import 'whatwg-fetch';
import { browserHistory } from 'react-router'


export default class editPost extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			author: '',
			title: '',
			body: ''
		};
	}
	componentWillMount(){
		console.log('this is working')
		var self = this
		fetch('/api/v1/posts/'+this.props.params.slug)
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			console.log('here is the json', json)
			self.setState(json)
		}).catch(function(ex) {
			console.log('parsing failed', ex)
		})
	}
	submitPost(){
		var self = this
		fetch('/api/v1/posts/' + this.props.params.slug	, {
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
			browserHistory.push('/')
		})		
	}
	deletePost(){
		console.log('DELETING POST', this.props.params.slug)
		var self = this
		fetch('api/v1/posts/'+self.props.params.slug, {
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
			browserHistory.push('/')
		})

	}
	render(){
		var self = this
		return (<div>
			<h1>Edit Post</h1>
				<p>Author</p> 
	      			<input onChange={(e) => this.setState({author : e.target.value})} value={self.state.author} />
	      		<p>Title</p> 
	      			<input onChange={(e) => this.setState({title : e.target.value})}  value={self.state.title} />
	      		<p>Body</p> 
	      			<textarea onChange={(e) => this.setState({body : e.target.value})}  value={self.state.body} />
	      		<p>
	      			<button onClick={this.submitPost.bind(this)}>Update</button>
	      			<button onClick={this.deletePost.bind(this)}>Delete</button>
	      		</p>
			</div>)
	}
}