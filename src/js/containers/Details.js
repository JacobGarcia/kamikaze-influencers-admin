/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { Component } from 'react'
import ExampleImage from './ExampleImage'
import FakeObjectDataListStore from './FakeObjectDataListStore'
import { Table, Column, Cell } from 'fixed-data-table'

import NetworkRequest from '../NetworkRequest'

class ImageCell extends Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props
    var image = {backgroundImage : `url(${data[rowIndex][field]})`}
    return(
      <Cell>
        <div className="exampleImage" style= {image} />
      </Cell>
    )
  }
}

class LinkCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props
    return (
      <Cell>
        <a href={'http://www.instagram.com/' + data[rowIndex][field]}>{data[rowIndex][field]}</a>
      </Cell>
    )
  }
}

class TextCell extends React.Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props
    return (
      <Cell>
        {data[rowIndex][field]}
      </Cell>
    )
  }
}

class MoneyCell extends Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props
    const payments = data[rowIndex][field]
    let amount = 0
    payments.forEach((payment) => {
      amount += payment.amount
    })
    return (
      <Cell>
        {amount}
      </Cell>
    )
  }
}

class DateCell extends Component {
  render() {
    const {rowIndex, field, data, ...props} = this.props
    const source = data[rowIndex][field]
    return (
      <Cell>
        {new Date(data[rowIndex][field]).toLocaleDateString()}
      </Cell>
    )
  }
}

class Details extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      myTableData: [
        {name: 'Rylan', email: 'Angelita_Weimann42@gmail.com'},
        {name: 'Amelia', email: 'Dexter.Trantow57@hotmail.com'},
        {name: 'Estevan', email: 'Aimee7@hotmail.com'},
        {name: 'Florence', email: 'Jarrod.Bernier13@yahoo.com'},
        {name: 'Tressa', email: 'Yadira1@hotmail.com'},
      ],
      dataList: new FakeObjectDataListStore(1000000),
      users: ''
    }

    this.getTotalUsers = this.getTotalUsers.bind(this)
  }

  componentWillMount() {
    // Get all info
    this.getTotalUsers()
  }

  getTotalUsers(){
    NetworkRequest.getDetails()
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
    const dataList = this.state.dataList
    return (
      <Table
        rowsCount={this.state.users.length}
        rowHeight={50}
        headerHeight={50}
        width={1000}
        height={500}
        {...this.props}>
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

// <Column
//   header={<Cell>Registration Date</Cell>}
//   cell={
//     <DateCell
//       data={this.state.users}
//       field="joinDate"
//     />
//   }
//   width={200}
// />



// // const DateCell = ({rowIndex, data, col, ...props}) => (
// //   <Cell {...props}>
// //     {data.getObjectAt(rowIndex)[col].toLocaleString()}
// //   </Cell>
// // );
// //
// // const ImageCell = ({rowIndex, data, col, ...props}) => (
// //   <ExampleImage
// //     src={data.getObjectAt(rowIndex)[col]}
// //   />
// // );
// //
// // const LinkCell = ({rowIndex, data, col, ...props}) => (
// //   <Cell {...props}>
// //     <a href="#">{data.getObjectAt(rowIndex)[col]}</a>
// //   </Cell>
// // );
// //
// // const TextCell = ({rowIndex, data, col, ...props}) => (
// //   <Cell {...props}>
// //     {data.getObjectAt(rowIndex)[col]}
// //   </Cell>
// // );
//
// class DateCell extends Component {
//   render() {
//     const {rowIndex, field, data, ...props} = this.props
//     const source = data[rowIndex][field]
//     return (
//       <Cell {...props}>
//         {data[rowIndex][field].toLocaleString()}
//       </Cell>
//     )
//   }
// }
//
//
//
// class LinkCell extends Component {
//   render() {
//     const {rowIndex, field, data, ...props} = this.props
//     const link = data[rowIndex][field]
//     return (
//       <Cell {...props}>
//         <a href={link}>{link}</a>
//       </Cell>
//     )
//   }
// }
//
// class TextCell extends Component {
//   render() {
//     const {rowIndex, field, data, ...props} = this.props
//     return (
//       <Cell {...props}>
//         {data[rowIndex][field]}
//       </Cell>
//     )
//   }
// }
//
// class Details extends Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       dataList: new FakeObjectDataListStore(1000000),
//     }
//   }
//
//   render() {
//     var {dataList} = this.state
//     return (
//       <Table
//         rowHeight={50}
//         headerHeight={50}
//         rowsCount={dataList.getSize()}
//         width={1000}
//         height={500}
//         {...this.props}>
//
//         <Column
//           header={<Cell>First Name</Cell>}
//           cell={<LinkCell data={dataList} col="firstName" />}
//           fixed={true}
//           width={100}
//         />
//         <Column
//           header={<Cell>Last Name</Cell>}
//           cell={<TextCell data={dataList} col="lastName" />}
//           fixed={true}
//           width={100}
//         />
//         <Column
//           header={<Cell>City</Cell>}
//           cell={<TextCell data={dataList} col="city" />}
//           width={100}
//         />
//         <Column
//           header={<Cell>Street</Cell>}
//           cell={<TextCell data={dataList} col="street" />}
//           width={200}
//         />
//         <Column
//           header={<Cell>Zip Code</Cell>}
//           cell={<TextCell data={dataList} col="zipCode" />}
//           width={200}
//         />
//         <Column
//           header={<Cell>Email</Cell>}
//           cell={<LinkCell data={dataList} col="email" />}
//           width={200}
//         />
//         <Column
//           header={<Cell>DOB</Cell>}
//           cell={<DateCell data={dataList} col="date" />}
//           width={200}
//         />
//       </Table>
//     );
//   }
// }

export default Details
