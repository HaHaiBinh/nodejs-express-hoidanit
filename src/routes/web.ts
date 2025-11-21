import express, { Express } from 'express'
import { getCreateUserPage, getHomePage, getViewUserPage, postCreateUserPage, postDeleteUserPage, postUpdateUserPage } from 'controllers/user.controller'
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller'
const router = express.Router()

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/create-user', getCreateUserPage)
    router.post('/handle-create-user', postCreateUserPage)
    router.post('/handle-delete-user/:id', postDeleteUserPage)
    router.get('/handle-view-user/:id', getViewUserPage)
    router.post('/handle-update-user', postUpdateUserPage)

    // admin routes
    router.get('/admin', getDashboardPage)
    router.get('/admin/user', getAdminUserPage)
    router.get('/admin/create-user', getCreateUserPage)
    router.get('/admin/order', getAdminOrderPage)
    router.get('/admin/product', getAdminProductPage)

    app.use('/', router)
}

export default webRoutes