import express, { Express } from 'express'
import { getCreateUserPage, getHomePage, getViewUserPage, postCreateUserPage, postDeleteUserPage, postUpdateUserPage } from 'controllers/user.controller'
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller'
import fileUploadMiddleware from 'src/middleware/multer'
import { getCartPage, getCheckoutPage, getProductPage, getThankYouPage, postAddProductToCart, postDeleteProductToCart, postHandleCartToCheckout, postPlaceOrder } from 'controllers/client/product.controller'
import { getAdminCreateProductPage, getViewProductPage, postCreateProductPage, postDeleteProductPage, postUpdateProductPage } from 'controllers/admin/product.controllers'
import { getLoginPage, getRegisterPage, getSuccessRedirectPage, postLogout, postRegister } from 'controllers/client/auth.controller'
import passport from 'passport'
import { isAdmin, isLogin } from 'src/middleware/auth'

const router = express.Router()

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/success-redirect', getSuccessRedirectPage)
    router.get('/login', getLoginPage)
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success-redirect',
        failureRedirect: '/login',
        failureMessage: true
    }))  // nhấn submit form đăng nhập thì vẫn trả về trang đăng nhập
    router.post('/logout', postLogout)

    router.get('/register', getRegisterPage)
    router.post('/register', postRegister)  // nhấn subnmit form đăng ký thì vẫn trả về trang đăng ký

    router.get('/product/:id', getProductPage)
    router.post('/add-product-to-cart/:id', postAddProductToCart)

    router.get('/cart', getCartPage)
    router.post('/delete-product-in-cart/:id', postDeleteProductToCart)

    router.post('/handle-cart-to-checkout', postHandleCartToCheckout)
    router.get('/checkout', getCheckoutPage)
    router.get('/checkout', getCheckoutPage)
    router.post('/place-order', postPlaceOrder)
    router.get('/thank', getThankYouPage)

    // admin routes
    router.get('/admin', getDashboardPage)
    
    router.get('/admin/user', getAdminUserPage)
    router.get('/admin/create-user', getCreateUserPage)
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUserPage)
    router.post('/admin/delete-user/:id', postDeleteUserPage)
    router.get('/admin/view-user/:id', getViewUserPage)
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUserPage)

    router.get('/admin/product', getAdminProductPage)
    router.get('/admin/create-product', getAdminCreateProductPage)
    router.post('/admin/handle-create-product', fileUploadMiddleware('image', "images/product"), postCreateProductPage)
    router.post('/admin/delete-product/:id', postDeleteProductPage)
    router.get('/admin/view-product/:id', getViewProductPage)
    router.post('/admin/update-product', fileUploadMiddleware('image', "images/product"), postUpdateProductPage)

    router.get('/admin/order', getAdminOrderPage)

    app.use('/', isAdmin, router)
}

export default webRoutes