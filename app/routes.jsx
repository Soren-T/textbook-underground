import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import SellBook from 'containers/sellBook';
import CreateAccount from 'containers/CreateAccount';
import Login from 'containers/Login';

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
    	<Route path='Login' component={Login} />
    </Route>
  );
};
