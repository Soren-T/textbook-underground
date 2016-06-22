import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';



export default class SellerHomepage extends React.Component {
	

  render() {
    return (
      <div>
      	<h1>Seller Homepage</h1>
      		<Link to='/sellBook'>Add a new listing </Link>	      	
      </div> 


      		
    );
  }
};