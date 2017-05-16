import React, { Component } from 'react'
import { Link } from 'react-router'
import axios from 'axios'

import NetworkRequest from '../NetworkRequest'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      totalUsers: 5200,
      payingUsers: 3020,
      totalUsers: 200,
      payingUsers: 20,
      users: [],
      months: [{
        totalIncome: 2000,
        totalUsers: 200,
        payingUsers: 20,
        users: [{name: 'Dewey'}],
        newUsers: 10
      }],
      newUsers: 10, // New users in the month, purchases in month, income, paying users
      newPayingUsers: 0,
      soldPackages: 32,
      packages: [{
        name: 'package-name',
        sold: 100,
      }], // Name and total purchases
      totalIncome: 3240,
      latestIncome: 0,
      //adding time
      user: '',
      time: '',
      username: '',
      fame: ''
    }

    this.getTotalUsers = this.getTotalUsers.bind(this)
    this.getTotalPaidUsers = this.getTotalPaidUsers.bind(this)
    this.getLatestUsers = this.getLatestUsers.bind(this)
    this.getLatestPaidUsers = this.getLatestPaidUsers.bind(this)
    this.getLatestIncome = this.getLatestIncome.bind(this)
    this.getPackages = this.getPackages.bind(this)
    this.getPackageUnit = this.getPackageUnit.bind(this)

    this.onUserChange = this.onUserChange.bind(this)
    this.onTimeChange = this.onTimeChange.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onFameChange = this.onFameChange.bind(this)
    this.setFame = this.setFame.bind(this)
    this.setTime = this.setTime.bind(this)
  }

  componentWillMount() {
    // Get all info
    this.getTotalUsers()
    this.getTotalPaidUsers()
    this.getLatestUsers()
    this.getLatestPaidUsers()
    this.getTotalIncome()
    this.getLatestIncome()
    this.getPackages()
    this.getPackageUnit()
  }

  getTotalUsers(){
    // Get number of total users
    NetworkRequest.getTotalUsers()
    .then((response) => {
      const users = response.data.users
      this.setState({
        totalUsers: users.length
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  getTotalPaidUsers(){
    // Get number of total users
    NetworkRequest.getTotalPaidUsers()
    .then((response) => {
      const users = response.data.users
      this.setState({
        payingUsers: users.length
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  getLatestUsers(){
    // Get number of total users
    NetworkRequest.getLatestUsers()
    .then((response) => {
      const users = response.data.users
      this.setState({
        newUsers: users.length
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  getLatestPaidUsers(){
    // Get number of total users
    NetworkRequest.getLatestPaidUsers()
    .then((response) => {
      const users = response.data.users
      this.setState({
        newPayingUsers: users.length
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  getTotalIncome(){
    // Get number of total users
    NetworkRequest.getTotalIncome()
    .then((response) => {
      const users = response.data.users
      this.setState({
        totalIncome: users[0].total
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  getLatestIncome(){
    // Get number of total users
    NetworkRequest.getLatestIncome()
    .then((response) => {
      const users = response.data.users
      this.setState({
        latestIncome: users[0].total
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  getPackages(){
      // Get number of total users
      NetworkRequest.getPackages()
      .then((response) => {
        const users = response.data.users
        this.setState({
          soldPackages: users.length
        })
      })
      .catch((error) => {
        // TODO: handle error
        console.log(error)
      })
    }

    getPackageUnit(){
        // Get number of total users
        NetworkRequest.getPackageUnit()
        .then((response) => {
          const packages = response.data
          this.setState({
            packages
          })
        })
        .catch((error) => {
          // TODO: handle error
          console.log(error)
        })
      }

    onUserChange(event) {
      this.setState({
          user: event.target.value
      })
    }

    onTimeChange(event) {
      this.setState({
          time: event.target.value
      })
    }

    onUsernameChange(event) {
      this.setState({
          username: event.target.value
      })
    }

    onFameChange(event) {
      this.setState({
          fame: event.target.value
      })
    }

    setTime() {
      const time = 1000 * 60 * 60 * 24 * this.state.time //in days
      NetworkRequest.setUserTime(this.state.user, time)
      .then((response) => {
        alert('Added ' + this.state.time + ' time days' + ' to user: ' + this.state.user)
        this.setState({
            user: '',
            time: ''
        })
      })
      .catch((error) => {
        // TODO: handle error
        alert('User ' + this.state.user + ' not registered')
      })
    }

    setFame() {
      const time = 1000 * 60 * 60 * 24 * this.state.fame //in days
      NetworkRequest.setUserFame(this.state.username, time)
      .then((response) => {
        alert('Added ' + this.state.fame + ' fame days' + ' to user: ' + this.state.username)
        this.setState({
            username: '',
            fame: ''
        })
      })
      .catch((error) => {
        // TODO: handle error
        alert('User ' + this.state.username + ' not registered')
      })
    }

  render() {

    const state = this.state


    return (
      <div>
        <div className='header'>
          <span></span>
          <img src='https://owainfluencers.com/static/img/owa.svg' className='logo' alt=''/>
        </div>
        <div className='body'>
          <div className='users-wrapper'>
            <div className='general-info'>
              <h1 className='users'><span className='red'>{this.state.totalUsers}</span> users</h1>
              <p><span className='red'>{state.payingUsers}</span> have purchased a package</p>
              <span className='red'><Link to='/userdetails'>View all</Link></span>
            </div>
              <div className='month'>
                <h2>Last 30 Days</h2>
                <p><span className='users red'>{state.newUsers}</span> new users, <span className='red'>{state.newPayingUsers}</span> have purchased a package</p>
              </div>
              <div className='section'>
                <div><span className='red'>ADD TIME</span></div>
                <div className='text'>
                  <input type="text" placeholder='Username' onChange={this.onUserChange} value={this.state.user}/>
                </div>
                  <div className='text'>
                    <span><input type="text" placeholder='Time to add in days' onChange={this.onTimeChange} value={this.state.time}/></span>
                </div>
                <input type='button' value='SET TIME ' className='red' onClick={this.setTime}/>
              </div>
              <div className='section'>
                <div><span className='red'>ADD FAME</span></div>
                <div className='text'>
                  <input type="text" placeholder='Username' onChange={this.onUsernameChange} value={this.state.username}/>
                </div>
                  <div className='text'>
                    <span><input type="text" placeholder='Time to add in days' onChange={this.onFameChange} value={this.state.fame}/></span>
                </div>
                <input type='button' value='SET FAME' className='red' onClick={this.setFame}/>
              </div>
          </div>
          <div className='finance-wrapper'>
            <div className='income-wrapper'>
              <h1><span className='red'>${Math.round(state.totalIncome*100)/100}</span> Income</h1>
              <p><span className='red'>{Math.round((state.payingUsers/state.totalUsers)*100)/100}%</span> of total users have purchased a package</p>
              <span className='red'><Link to='/paymentdetails'>View all</Link></span>
                <div className='income-month'>
                  <p>Last 30 Days ${Math.round(state.latestIncome*100)/100} income</p>
                  <p><span className='red'>{Math.round((state.newPayingUsers/state.newUsers)*100)/100}%</span> of users have purchased a package</p>
                </div>
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
    )
  }

}

export default Dashboard
