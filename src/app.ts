// const express = require('express')

import express from 'express'
import webRoutes from './routes/web'

import 'dotenv/config'
import getConnection from './config/database'
const app = express()
const port = process.env.PORT || 6868

// config view engine
app.set('view engine', 'ejs')
app.set('views', './src/views')

// config body parser (req.body)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// config static files: img, css, js
app.use(express.static('public'))

// config routes
webRoutes(app)

getConnection()

app.listen(port, () => {
  console.log(`Example app listening on port haha ${port}`)
})