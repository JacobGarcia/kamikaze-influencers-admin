import React, { Component } from 'react'
import axios from 'axios'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      authenticated: true,
      username: '',
      password: '',
      totalUsers: 5200,
      payingUsers: 3020,
      months: [{
        totalIncome: 2000,
        totalUsers: 200,
        payingUsers: 20,
        users: [],
        name: 'May',
        year: 2017,
        newUsers: 10
      }], // New users in the month, purchases in month, income, paying users
      soldPackages: 32,
      packages: [{
        name: 'package-name',
        sold: 100,
      }], // Name and total purchases
      totalIncome: 3240,
    }
  }

  componentWillMount() {
    // Get all info
  }

  authenticate() {
    axios.post(`${window.baseUrl}/admin/authenticate`)
    .then(response => {

    })
    .catch(error => {

    })
  }

  isAuthenticated() {
    return true
  }

  render() {

    const state = this.state


    return (
      state.authenticated ? (
      <div>
        <div className='header'>
          <span></span>
          <img src='https://owainfluencers.com/static/img/owa.svg' className='logo' alt=''/>
          <input type='button' value='Signout'/>
        </div>
        <div className='body'>
          <div className='users-wrapper'>
            <div className='general-info'>
              <h1 className='users'><span className='red'>{state.totalUsers}</span> Users</h1>
              <p><span className='red'>{state.payingUsers}</span> have purchased a package</p>
            </div>
            { state.months.map((month, index) =>
              <div className='month' key={index}>
                <h2>{month.name} {month.year}</h2>
                <p><span className='users red'>{month.newUsers}</span> new users, <span className='red'>{month.payingUsers}</span> have purchased a package</p>
                <div className='month-users'>
                  { month.users.map((user, index) =>
                    <div className='user' key={index}></div>
                  ) }
                </div>
              </div>
            ) }
          </div>
          <div className='finance-wrapper'>
            <div className='income-wrapper'>
              <h1><span className='red'>${state.totalIncome}</span> Income</h1>
              <p><span className='red'>{Math.round((state.totalUsers/state.payingUsers)*100)/100}%</span> of total users have purchased a package</p>
              { state.months.map((month, index) =>
                <div className='income-month' key={index}>
                  <p>{month.name} {month.year} ${month.totalIncome} income</p>
                  <p><span className='red'>{month.totalUsers/month.payingUsers}%</span> of users have purchased a package</p>
                </div>
              )}
            </div>
            <div className='packages-wrapper'>
              <h1><span className='red'>{state.soldPackages}</span> Packages</h1>
              { state.packages.map((packageObject, index) =>
                <div className='package' key={index}>
                  <div className='package-name'>{packageObject.name}</div>
                  <div className='package-sales'><span className='red'>{packageObject.sold}</span> purchased</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ) :
    (
      <div>
        {state.authenticated}
        <input type='text' value={this.state.username} onChange={this.onChange}/>
        <input type='password' value={this.state.password} onChange={this.onChange}/>
        <input type='button' value='Login' onClick={this.authenticate}/>
      </div>
    )
  )
  }

}

export default Dashboard
