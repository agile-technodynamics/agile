import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom' 
import { useSelector } from 'react-redux'
import store from './store'
import { useEffect } from 'react'
import "@fortawesome/fontawesome-free/css/all.min.css"

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/route/ProtectedRoute'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import ConfirmationPage from './components/ConfirmationPage'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'

import Login from './components/admins/Login'
import ForgotPassword from './components/admins/ForgotPassword'
import NewPassword from './components/admins/NewPassword'
import EmailSent from './components/EmailSent'
import Profile from './components/admins/Profile'
import UpdateProfile from './components/admins/UpdateProfile'
import UpdatePassword from './components/admins/UpdatePassword'
import PasswordSuccess from './components/admins/PasswordSuccess'
import Dashboard from './components/admins/Dashboard'
import Help from './components/admins/Help'
import ListAbout from './components/admins/ListAbout'
import ListHome from './components/admins/ListHome'
import ListFooter from './components/admins/ListFooter'
import ListServices from './components/admins/ListServices'
import ListProducts from './components/admin/ListProducts'
import UpdateHome from './components/admins/UpdateHome'
import UpdateAbout from './components/admins/UpdateAbout'
import UpdateServices from './components/admins/UpdateServices'
import UpdateFooter from './components/admins/UpdateFooter'

import ListInquiries from './components/admin/ListInquiries'
import ListAppointments from './components/admin/ListAppointments'
import ListOthers from './components/admin/ListOthers'
import ListArchives from './components/admin/ListArchives'
import ListTrash from './components/admin/ListTrash'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import UpdateInquiry from './components/admin/UpdateInquiry'

import Register from './components/superadmin/Register'
import ListSuperAdmins from './components/superadmin/ListSuperAdmins'
import ListAdmins from './components/superadmin/ListAdmins'
import UpdateUser from './components/superadmin/UpdateUser'
import UpdateUserSuccess from './components/superadmin/UpdateUserSuccess'

import ScrollToTop from './components/layout/ScrollToTop'
import { loadUser } from './actions/userActions'

function App() {
    const { loading } = useSelector(state => state.auth)
    const { isDashboard }  = useSelector(state => state.dashboard)
    
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

    return (
        <Router>
            <div className="App">
                <ScrollToTop>
                    {!loading && !isDashboard && (
                        <Header/>
                    )}
                    {/*Home*/}
                    <Route path='/' component={Home} exact/>
                    <Route path='/about-us' component={About} exact/>
                    <Route path='/services' component={Services} exact/>
                    <Route path={'/products'} component={Products} exact/>
                    <Route path='/product/:id' component={ProductDetails} exact/>
                    <Route path='/contact-us' component={Contact} exact/>
                    <Route path='/confirmation' component={ConfirmationPage} exact/>
                    {/*Login*/}
                    <Route path='/login' component={Login} exact/>
                    <Route path="/password/forgot" component={ForgotPassword} exact/>
                    <Route path='/email-sent' component={EmailSent} exact/>
                    <Route path="/password/reset/:token" component={NewPassword} exact/>
                    <Route path='/password-success' component={PasswordSuccess} exact/>
                    {/*for all Admins*/}
                    <ProtectedRoute path="/admin/dashboard" forAdmins={true} component={Dashboard} exact/>
                    <ProtectedRoute path="/admin/help" forAdmins={true} component={Help} exact/>
                    <ProtectedRoute path="/admin/me" forAdmins={true} component={Profile} exact/>
                    <ProtectedRoute path="/admin/edit-profile" forAdmins={true} component={UpdateProfile} exact/>
                    <ProtectedRoute path="/password/update" forAdmins={true} component={UpdatePassword} exact/>
                    {/*for Superadmins*/}
                    <ProtectedRoute path='/register' isSuperAdmin={true} component={Register} exact/>
                    <ProtectedRoute path='/admin/users/superadmin' isSuperAdmin={true} component={ListSuperAdmins} exact/>
                    <ProtectedRoute path='/admin/users/admin' isSuperAdmin={true} component={ListAdmins} exact/>
                    <ProtectedRoute path="/superadmin/user/:id" isSuperAdmin={true} component={UpdateUser} exact/>
                    <ProtectedRoute path="/admin/update-success" isSuperAdmin={true} component={UpdateUserSuccess} exact/>
                    {/*for Admins*/}
                    <ProtectedRoute path="/admin/products" isAdmin={true} component={ListProducts} exact/>
                    <ProtectedRoute path="/admin/inquiries" isAdmin={true} component={ListInquiries} exact/>
                    <ProtectedRoute path="/admin/appointments" isAdmin={true} component={ListAppointments} exact/>
                    <ProtectedRoute path="/admin/others" isAdmin={true} component={ListOthers} exact/>
                    <ProtectedRoute path="/admin/archives" isAdmin={true} component={ListArchives} exact/>
                    <ProtectedRoute path="/admin/trash" isAdmin={true} component={ListTrash} exact/>
                    <ProtectedRoute path="/admin/home" forAdmins={true} component={ListHome} exact/>
                    <ProtectedRoute path="/admin/about" forAdmins={true} component={ListAbout} exact/>
                    <ProtectedRoute path="/admin/service" forAdmins={true} component={ListServices} exact/>
                    <ProtectedRoute path="/admin/footer" forAdmins={true} component={ListFooter} exact/>
                    {/*updates*/}
                    <ProtectedRoute path="/admin/newProduct" isAdmin={true} component={NewProduct} exact/>
                    <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>
                    <ProtectedRoute path="/admin/inquiry/:id" isAdmin={true} component={UpdateInquiry} exact/>
                    <ProtectedRoute path="/admin/home/:id" forAdmins={true} component={UpdateHome} exact/>
                    <ProtectedRoute path="/admin/about/:id" forAdmins={true} component={UpdateAbout} exact/>
                    <ProtectedRoute path="/admin/service/:id" forAdmins={true} component={UpdateServices} exact/>
                    <ProtectedRoute path="/admin/update-footer" forAdmins={true} component={UpdateFooter} exact/>
                
                    {!loading && !isDashboard && (
                        <Footer/>
                    )}
                </ScrollToTop>
            </div>
        </Router>
    )
}

export default App