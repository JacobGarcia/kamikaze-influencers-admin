import React, { Component } from 'react'
import { Table, Column, Cell } from 'fixed-data-table'

import NetworkRequest from '../NetworkRequest'

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

class ArrayCell extends Component {
  render() {
    const {rowIndex, field, column, data} = this.props
    return (
      <Cell className='cell'>
        {data[rowIndex][field][column]}
      </Cell>
    )
  }
}

class MoneyCell extends Component {
  render() {
    const {rowIndex, field, data} = this.props
    const payments = data[rowIndex][field]
    return (
      <Cell className='cell'>
        {'$' + payments.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
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

class PaymentDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      payments: ''
    }

    this.getPaymentDetails = this.getPaymentDetails.bind(this)
  }

  componentWillMount() {
    // Get all info
    this.getPaymentDetails()
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

  getPaymentDetails(){
    NetworkRequest.getPaymentDetails()
    .then((response) => {
      const payments = response.data.payments
      this.setState({
        payments
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
        <img src='https://kamikazefollowers.com/static/img/owa.svg' className='logo' alt=''/>
      </div>
      <Table
        rowsCount={this.state.payments.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={850}
        >
        <Column
          header={<Cell>ID</Cell>}
          cell={
            <TextCell
              data={this.state.payments}
              field="paypal_id"
            />
          }
          width={200}
        />
        <Column
          header={<Cell>Item</Cell>}
          cell={
            <ArrayCell
              data={this.state.payments}
              field="item_id"
              column="name"
            />
          }
          width={200}
        />
        <Column
          header={<Cell>Amount</Cell>}
          cell={
            <MoneyCell
              data={this.state.payments}
              field="amount"
            />
          }
          width={200}
        />
        <Column
          header={<Cell>User</Cell>}
          cell={
            <LinkCell
              data={this.state.payments}
              field="username"
            />
          }
          width={200}
        />
        <Column
          header={<Cell>Date</Cell>}
          cell={
            <DateCell
              data={this.state.payments}
              field="date"
            />
          }
          width={200}
        />
      </Table>
      </div>
    )
  }
}

export default PaymentDetails
