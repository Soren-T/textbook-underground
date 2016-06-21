import React, { Component, PropTypes } from 'react';

export default class SellBook extends React.Component {
  
  render() {
    return (
      <div>
      	<h1>Sell Your Book</h1>
	      	<p>Title</p> 
      			<input onChange={(e)=>this.setState({author:e.target.value})} />
      		<p>Author</p> 
      			<input onChange={(e)=>this.setState({title:e.target.value})} />
      		<p>ISBN</p> 
      			<input onChange={(e)=>this.setState({title:e.target.value})} />	
      		<p>Price</p> 
      			<input onChange={(e)=>this.setState({title:e.target.value})} />	
      		<p>Condition</p>
      			<input type="radio" name="Condition" value="New"/> New<br/>
      			<input type="radio" name="Condition" value="Like-New"/> Like-New<br/>
      			<input type="radio" name="Condition" value="Slightly-Used"/> Slightly-Used<br/>
      			<input type="radio" name="Condition" value="Fair"/> Fair<br/>
      			<input type="radio" name="Condition" value="Poor"/> Poor<br/>
      		<p>Description</p> 
      			<textarea onChange={(e)=>this.setState({body:e.target.value})} /> </div> 

      		
    );
  }
};
