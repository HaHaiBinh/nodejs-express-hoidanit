// const express = require('express')

import express from 'express'
import webRoutes from './routes/web'

import 'dotenv/config'
const app = express()
const port = process.env.PORT || 6868

// config view engine
app.set('view engine', 'ejs')
app.set('views', './src/views')

// config routes
webRoutes(app)

// config static files: img, css, js
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})