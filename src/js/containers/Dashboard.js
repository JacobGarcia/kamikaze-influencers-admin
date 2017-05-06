import React, { Component } from 'react'
import axios from 'axios'

import NetworkRequest from '../NetworkRequest'

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      totalUsers: 0,
      payingUsers: 0,
      totalUsers: 0,
      payingUsers: 0,
      users: [],
      months: [{
        totalIncome: 0,
        totalUsers: 0,
        payingUsers: 0,
        users: [],
        newUsers: 0
      }],
      newUsers: 10, // New users in the month, purchases in month, income, paying users
      newPayingUsers: 0,
      soldPackages: 32,
      packages: [{
        name: '',
        sold: 100,
      }], // Name and total purchases
      totalIncome: 0,
      latestIncome: 0
    }

    this.getTotalUsers = this.getTotalUsers.bind(this)
    this.getTotalPaidUsers = this.getTotalPaidUsers.bind(this)
    this.getLatestUsers = this.getLatestUsers.bind(this)
    this.getLatestPaidUsers = this.getLatestPaidUsers.bind(this)
    this.getLatestIncome = this.getLatestIncome.bind(this)
    this.getPackages = this.getPackages.bind(this)
    this.getPackageUnit = this.getPackageUnit.bind(this)
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
          console.log(packages);
          this.setState({
            packages
          })
        })
        .catch((error) => {
          // TODO: handle error
          console.log(error)
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
            </div>
              <div className='month'>
                <h2>Last 30 Days</h2>
                <p><span className='users red'>{state.newUsers}</span> new users, <span className='red'>{state.newPayingUsers}</span> have purchased a package</p>
              </div>
          </div>
          <div className='finance-wrapper'>
            <div className='income-wrapper'>
              <h1><span className='red'>${Math.round(state.totalIncome*100)/100}</span> Income</h1>
              <p><span className='red'>{Math.round((state.payingUsers/state.totalUsers)*100)/100}%</span> of total users have purchased a package</p>
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
