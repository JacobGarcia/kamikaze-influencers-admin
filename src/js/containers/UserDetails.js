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
      <Cell className='cell'>
        <a href={'http://www.instagram.com/' + data[rowIndex][field]}>{data[rowIndex][field]}</a>
      </Cell>
    )
  }
}

class TextCell extends Component {
  render() {
    const {rowIndex, field, data} = this.props
    return (
      <Cell className='cell'>
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
      <Cell className='cell'>
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
      <Cell className='cell'>
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

  componentDidMount() {
    this._update()
    var win = window
    if (win.addEventListener) {
      win.addEventListener('resize', this._onResize, false)
    } else if (win.attachEvent) {
      win.attachEvent('onresize', this._onResize)
    } else {
      win.onresize = this._onResize
    }
  }

  _onResize() {
    clearTimeout(this._updateTimer)
    this._updateTimer = setTimeout(this._update, 16)
  }

  _update() {
    var win = window

    var widthOffset = win.innerWidth < 680 ? 0 : 240

    this.setState({
      tableWidth: win.innerWidth - widthOffset,
      tableHeight: win.innerHeight - 200,
    })
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
      <div>
      <div className='header'>
        <span></span>
        <img src='https://owainfluencers.com/static/img/owa.svg' className='logo' alt=''/>
      </div>
      <Table
        rowsCount={this.state.users.length}
        rowHeight={50}
        headerHeight={50}
        width={850}
        height={850}
        >
        <Column
          cell={
            <ImageCell
              data={this.state.users}
              field="profile_picture"
            />
          }
          fixed={false}
          width={50}
        />
        <Column
          header={<Cell>User</Cell>}
          cell={
            <LinkCell
              data={this.state.users}
              field="username"
            />
          }
          fixed={false}
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
          fixed={false}
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
          fixed={false}
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
          fixed={false}
          width={200}
        />

      </Table>
      </div>
    )
  }
}

export default UserDetails
