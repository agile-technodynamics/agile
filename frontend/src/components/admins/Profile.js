import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from './../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/profile.css'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const Profile = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user, loading } = useSelector(state => state.auth)
    
    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => setToggled(!isToggled)
    
    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'My Profile'} />
                    <div id="wrapper" className={ isToggled ? null : "toggled"}>
                        <div id="sidebar-wrapper" >
                            <ul className="sidebar-nav">
                                <li className="sidebar-brand">Agile Technodynamics</li>
                                <li> <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                                <li> <Link to="/admin/me"><i className="fa fa-user"></i> My Profile</Link></li>
                                <li> <Link to="/"><i className="fa fa-home"></i> Agile Homepage</Link></li>
                                {user && user.role !== 'admin' ? (
                                        <Fragment>
                                            <hr/>
                                                <li> <Link to="/admin/users/admin"><i className="fa fa-users"></i> Admins</Link></li>
                                                <li> <Link to="/admin/users/superadmin"><i className="fa fa-user-circle"></i> Superadmins</Link></li>
                                                <li> <Link to="/register"><i className="fa fa-user-plus"></i> Register</Link></li>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <li> <Link to="/admin/products"><i className="fa fa-shopping-bag"></i> Products</Link></li>
                                            <hr/>
                                            <li> <Link to="/admin/inquiries"><i className="fa fa-envelope"></i> Inquiries</Link></li>
                                            <li> <Link to="/admin/appointments"><i className="fa fa-archive"></i> Appointments</Link></li>
                                            <li> <Link to="/admin/others"><i className="fa fa-inbox"></i> Other Concerns</Link></li>
                                            <hr/>
                                            <li> <Link to="/admin/archives"><i className="fa fa-envelope-open"></i> Archives</Link></li>
                                            <li> <Link to="/admin/trash"><i className="fa fa-trash"></i> Trash</Link></li>
                                        </Fragment>
                                    )
                                }
                                <hr/>
                                <li> <Link to="/admin/help"><i className="fa fa-question-circle"></i> Help</Link></li>
                                <li className="text-danger" onClick={logoutHandler}> <Link to="/"><i className="fa fa-sign-out"></i> Log out</Link></li>
                            </ul>
                        </div>
                            <div className="page-content-wrapper">
                                <div className="container-fluid">
                                    <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}>
                                        <i className="fa fa-bars"   ></i>
                                    </a>
                                    <div className="container">
                                        <div className="main-body">
                                            <h1 style={{textAlign: 'center', padding:'0 0 15px 0'}}>My Profile</h1>
                                            {loading ? <Loader/> : (
                                                <Fragment>
                                                    <div className="row gutters-sm">
                                                        <div className="col-md-4 mb-3">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <div className="d-flex flex-column align-items-center text-center">
                                                                        <img src={user.avatar.url} alt="Avatar" className="rounded-circle" width="150px" height="150px"/>
                                                                        <div className="mt-3">
                                                                            <h4>{user.name}</h4>
                                                                            <p className="text-dark mb-1" style={{textTransform: 'uppercase'}}>{user.role}</p>
                                                                            <Link className="btn btn-dark btn-sm ml-3 mt-3" type="button" to="/admin/edit-profile">Edit Profile</Link>
                                                                            <Link className="btn btn-dark btn-sm ml-3 mt-3" type="button" to="/password/update">Change Password</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card mb-3">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Full Name</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-dark">
                                                                            {user.name}
                                                                        </div>
                                                                    </div>
                                                                    <hr/>
                                                                    <div className="row">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Email</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-dark">
                                                                            {user.email}
                                                                        </div>
                                                                    </div>
                                                                    <hr/>
                                                                    <div className="row">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Phone</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-dark">
                                                                            {user.contactNumber}
                                                                        </div>
                                                                    </div>
                                                                    <hr/>
                                                                    <div className="row">
                                                                        <div className="col-sm-3">
                                                                            <h6 className="mb-0">Address</h6>
                                                                        </div>
                                                                        <div className="col-sm-9 text-dark">
                                                                            {user.address}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            )}
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Profile
