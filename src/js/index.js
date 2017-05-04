import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './containers/Dashboard'

window.baseUrl = 'http://owainfluencers.com/v1'

const div = document.createElement('div')
document.body.appendChild(div)
div.id = 'root'

ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root')
)
