import express, { Express } from 'express'
import { getCreateUserPage, getHomePage, getViewUserPage, postCreateUserPage, postDeleteUserPage, postUpdateUserPage } from 'controllers/user.controller'
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller'
import fileUploadMiddleware from 'src/middleware/multer'
import { getProductPage } from 'controllers/client/product.controller'

const router = express.Router()

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/product/:id', getProductPage)
    

    // admin routes
    router.get('/admin', getDashboardPage)
    router.get('/admin/user', getAdminUserPage)
    router.get('/admin/create-user', getCreateUserPage)
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUserPage)
    router.post('/admin/delete-user/:id', postDeleteUserPage)
    router.get('/admin/view-user/:id', getViewUserPage)
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUserPage)

    router.get('/admin/order', getAdminOrderPage)
    router.get('/admin/product', getAdminProductPage)

    app.use('/', router)
}

export default webRoutes