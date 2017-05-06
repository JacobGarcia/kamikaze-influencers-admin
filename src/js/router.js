import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Details from './containers/Details'
import Dashboard from './containers/Dashboard'

const Routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Dashboard}/>
    <Route path='details' component={Details}/>
  </Router>
)

export default Routes
