import express, { Express } from 'express'
const router = express.Router()

const webRoutes = (app: Express) => {
    router.get('/', (req, res) => {
        res.render('home.ejs', { name: 'HHB' })
    })

    router.get('/hhb', (req, res) => {
        res.send('Hello HHB ^^^!')
    })

    app.use('/', router)
}

export default webRoutes