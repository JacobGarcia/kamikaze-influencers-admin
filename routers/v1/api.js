const express = require('express')
const path = require('path')
const request = require('request')
const mongoose = require('mongoose')
const winston = require('winston')
const router = express.Router()

const User = require(path.resolve('models/User'))
const Payment = require(path.resolve('models/Payment'))
const Item = require(path.resolve('models/Item'))

const config = require(path.resolve('config/config'))

mongoose.connect(config.database)
/*
   ADMIN DASHBOARD STATS

   Here all the stats for the admin will be done
*/
router.route('/admin/self/total/users')
.get((req, res) => {

  User.find({})
  .select('profile_picture username paidUser joinDate -_id')
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ users })
  })
})

router.route('/admin/self/total/paid/users')
.get((req, res) => {

  User.find({paidUser: true})
  .select('profile_picture username paidUser -_id')
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ users })
  })
})

router.route('/admin/self/latest/users')
.get((req, res) => {
  const days = 2592000000 //  30 days

  User.find({ joinDate:{ $gt: Date.now() - days } })
  .select('profile_picture username paidUser -_id')
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ users })
  })
})

router.route('/admin/self/latest/paid/users')
.get((req, res) => {
  const days = 2592000000 //  30 days

  User.find({joinDate:{ $gt: Date.now() - days }, paidUser: true})
  .select('profile_picture username paidUser  -_id')
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ users })
  })
})

router.route('/admin/self/total/income')
.get((req, res) => {
  const income = [{
    $group: {
      _id: null,
      total: { $sum: "$amount" }
    }
  }]

  Payment.aggregate(income)
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ users })
  })
})

router.route('/admin/self/latest/income')
.get((req, res) => {
  const days = 2592000000 //  30 days
  const income = [
    {
      $match: {date:{ $gt: Date.now() - days }}
    },
    { $group: {
      _id: null,
      total: { $sum: "$amount" }
    }
  }]

  Payment.aggregate(income)
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ users })
  })
})

router.route('/admin/self/total/payments')
.get((req, res) => {

  Payment.find({})
  .select('item_id amount payer username date -_id')
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({ users })
  })
})

router.route('/admin/self/total/packages')
.get((req, res) => {
  const income = [
    // Then join
        { "$lookup": {
            "from": "items",
            "localField": "item_id",
            "foreignField": "_id",
            "as": "payment"
        }},
    { $group: {
      _id: '$item_id',
      name: { $addToSet: "$payment.name" },
      sold: { $sum: 1 }
    }
  }]

  Payment.aggregate(income)
  .exec((error, result) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
      res.status(200).json(result)
  })
})

router.route('/admin/self/detailed/users')
.get((req, res) => {
  const income = [{
    $project : { username : 1, profile_picture : 1, joinDate: 1, _id: 0} },
    { "$lookup": {
      "from": "payments",
      "localField": "username",
      "foreignField": "username",
      "as": "payments"
    }
  }]

  User.aggregate(income)
  .exec((error, users) => {
    if (error) {
      console.log(error)
      return res.status(500).json({ error })
    }
    res.status(200).json({users})
  })
})



module.exports = router
