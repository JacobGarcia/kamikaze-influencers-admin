import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import UserDetails from './containers/UserDetails'
import PaymentDetails from './containers/PaymentDetails'
import Dashboard from './containers/Dashboard'

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Dashboard}/>
    <Route path='userdetails' component={UserDetails}/>
    <Route path='paymentdetails' component={PaymentDetails}/>
  </Router>
)

export default Routes
