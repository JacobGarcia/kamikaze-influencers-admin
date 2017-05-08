import React, { Component } from 'react'
import { Table, Column, Cell } from 'fixed-data-table'

import NetworkRequest from '../NetworkRequest'

class ImageCell extends Component {
  render() {
    const {rowIndex, field, data} = this.props
    var image = {backgroundImage : `url(${data[rowIndex][field]})`}
    return(
      <Cell>
        <div className="exampleImage" style= {image} />
      </Cell>
    )
  }
}

class LinkCell extends Component {
  render() {
    const {rowIndex, field, data} = this.props
    return (
      <Cell>
        <a href={'http://www.instagram.com/' + data[rowIndex][field]}>{data[rowIndex][field]}</a>
      </Cell>
    )
  }
}

class TextCell extends Component {
  render() {
    const {rowIndex, field, data} = this.props
    return (
      <Cell>
        {data[rowIndex][field]}
      </Cell>
    )
  }
}

class MoneyCell extends Component {
  render() {
    const {rowIndex, field, data} = this.props
    const payments = data[rowIndex][field]
    let amount = 0
    payments.forEach((payment) => {
      amount += payment.amount
    })
    return (
      <Cell>
        {'$' + amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
      </Cell>
    )
  }
}

class DateCell extends Component {
  render() {
    const {rowIndex, field, data} = this.props
    const source = data[rowIndex][field]
    return (
      <Cell>
        {new Date(data[rowIndex][field]).toLocaleDateString()}
      </Cell>
    )
  }
}

class UserDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: ''
    }

    this.getUserDetails = this.getUserDetails.bind(this)
  }

  componentWillMount() {
    // Get all info
    this.getUserDetails()
  }

  getUserDetails(){
    NetworkRequest.getUserDetails()
    .then((response) => {
      const users = response.data.users
      console.log(users);
      this.setState({
        users
      })
    })
    .catch((error) => {
      // TODO: handle error
      console.log(error)
    })
  }

  render() {
    return (
      <Table
        rowsCount={this.state.users.length}
        rowHeight={50}
        headerHeight={50}
        width={850}
        height={500}
        >
        <Column
          cell={
            <ImageCell
              data={this.state.users}
              field="profile_picture"
            />
          }
          width={50}
        />
        <Column
          header={<Cell>Username</Cell>}
          cell={
            <LinkCell
              data={this.state.users}
              field="username"
            />
          }
          width={200}
        />
        <Column
          header={<Cell>Full Name</Cell>}
          cell={
            <TextCell
              data={this.state.users}
              field="fullName"
            />
          }
          width={200}
        />
        <Column
          header={<Cell>Invested money</Cell>}
          cell={
            <MoneyCell
              data={this.state.users}
              field="payments"
            />
          }
          width={200}
        />
        <Column
          header={<Cell>Join Date</Cell>}
          cell={
            <DateCell
              data={this.state.users}
              field="joinDate"
            />
          }
          width={200}
        />

      </Table>
    )
  }
}

export default UserDetails
