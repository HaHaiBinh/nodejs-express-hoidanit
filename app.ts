// const express = require('express')

import express from 'express'
const app = express()
const port = 6868

app.get('/', (req, res) => {
  res.send('Hello World @@!')
})

app.get('/hhb', (req, res) => {
  res.send('Hello HHB!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})