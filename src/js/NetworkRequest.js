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

}

export default NetworkRequest
