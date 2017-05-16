import axios from 'axios'

class NetworkRequest {

  static getTotalUsers() {
    return axios.get(`${window.baseUrl}/admin/self/total/users`)
  }

  static getTotalPaidUsers() {
    return axios.get(`${window.baseUrl}/admin/self/total/paid/users`)
  }

  static getLatestUsers() {
    return axios.get(`${window.baseUrl}/admin/self/latest/users`)
  }

  static getLatestPaidUsers() {
    return axios.get(`${window.baseUrl}/admin/self/latest/paid/users`)
  }

  static getTotalIncome() {
    return axios.get(`${window.baseUrl}/admin/self/total/income`)
  }

  static getLatestIncome() {
    return axios.get(`${window.baseUrl}/admin/self/latest/income`)
  }

  static getPackages() {
    return axios.get(`${window.baseUrl}/admin/self/total/payments`)
  }

  static getPackageUnit() {
    return axios.get(`${window.baseUrl}/admin/self/total/packages`)
  }

  static getUserDetails() {
    return axios.get(`${window.baseUrl}/admin/self/detailed/users`)
  }

  static getPaymentDetails() {
    return axios.get(`${window.baseUrl}/admin/self/detailed/payments`)
  }

  static setUserTime(user, time) {
    return axios.post(`${window.baseUrl}/admin/self/add/time`, { user, time })
  }

  static setUserFame(user, fame) {
    return axios.post(`${window.baseUrl}/admin/self/add/fame`, { user, fame })
  }

}

export default NetworkRequest
