// const express = require('express')

import express from 'express'
import webRoutes from './routes/web'

import 'dotenv/config'
import initDatabase from 'config/seed'
import passport from 'passport'
import configPassportLocal from './middleware/passport.local'
import session from 'express-session'
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

// config session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// config passport
app.use(passport.initialize())
app.use(passport.authenticate('session'))

configPassportLocal();

// config routes
webRoutes(app)

// seeding data
initDatabase();

// handle 404 page
app.use((req, res) => {
    res.render('client/auth/404Page.ejs');
});

app.listen(port, () => {
  console.log(`Example app listening on port haha ${port}`)
})