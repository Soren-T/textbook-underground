import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';



export default class SellerHomepage extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  displayBooks(){
    //get books by user
    return (<h3>books go here</h3>)
  }

  render() {
    return (
      <div>
      	<h1>Seller Homepage</h1>
      		<Link to='/sellBook'>Add a new listing </Link><br/>
          {this.displayBooks()}
      </div> 


      		
    );
  }
};