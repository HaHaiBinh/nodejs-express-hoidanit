// const express = require('express')

import express from 'express'
import 'dotenv/config'
const app = express()
const port = process.env.PORT || 6868

app.get('/', (req, res) => {
  res.send('Hello World ^^^!')
})

app.get('/hhb', (req, res) => {
  res.send('Hello HHB ^^^!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log('log port', process.env.PORT)
})