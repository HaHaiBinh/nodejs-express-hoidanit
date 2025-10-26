// const express = require('express')

import express from 'express'
import 'dotenv/config'
const app = express()
const port = process.env.PORT || 6868

// config view engine
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.get('/', (req, res) => {
  res.render('home.ejs', { name: 'HHB' })
})

app.get('/hhb', (req, res) => {
  res.send('Hello HHB ^^^!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})