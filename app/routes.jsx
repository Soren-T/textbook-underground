import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import SellBook from 'containers/sellBook';
import CreateAccount from 'containers/CreateAccount';
import Login from 'containers/Login';
import SellerHomepage from 'containers/SellerHomepage';
import buyBook from 'containers/buyBook';
import Editor from 'containers/Editor';
import AdminPage from 'containers/adminPage';
import ManageUsers from 'containers/ManageUsers';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  return (
    <Route path="/" component={App}>
    	<IndexRoute component={Home} />
    	<Route path="sellBook" component={SellBook} />
    	<Route path="CreateAccount" component={CreateAccount} />
    	<Route path="Login" component={Login} />
    	<Route path="SellerHomepage" component={SellerHomepage} />
    	<Route path="buyBook/:_id" component={buyBook} />
        <Route path="Editor/:_id" component={Editor} />
        <Route path="AdminPage" component={AdminPage} />
        <Route path="ManageUsers" component={ManageUsers} />
    </Route>
  );
};
