import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { updateUser, getUserDetails, clearErrors, logout } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const UpdateUser = ({match, history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, user } = useSelector(state => state.getUser)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.updateUser)

    const [name, setName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [role, setRole] = useState('')
    const [initialRole, setInitialRole] = useState('')
    const [address, setAddress] = useState('')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)

    const userId = match.params.id
    const roles = ['admin', 'superadmin']

    const handleToggle = () => {
        setToggled(!isToggled)
    }

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name)
        formData.set('contactNumber', contactNumber)
        formData.set('address', address)
        formData.set('role', role)

        dispatch(updateUser(user._id, formData))
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const discardChanges = (role) => {
        if(role === 'admin') {
            handleClose()
            history.push('/admin/users/admin')
        } else {
            handleClose()
            history.push('/admin/users/superadmin')
        }
    }

    useEffect(() => {
        if(user && user._id !== userId) {
            dispatch(getUserDetails(userId))
        }
        else { 
            setName(user.name)
            setContactNumber(user.contactNumber)
            setRole(user.role)
            setInitialRole(user.role)
            setAddress(user.address)
        }

        if(error){
            history.push('/admin/dashboard')
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_USER_RESET
            })
        }
        if(updateError){
            history.push('/admin/dashboard')
            alert.error(updateError)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_USER_RESET
            })
        }

        if(isUpdated) {
            if(initialRole === 'admin') {
                if(initialRole !== role) {
                    history.push('/admin/update-success')
                    alert.success('User has been updated.')
                } else {
                    history.push('/admin/users/admin')
                    alert.success('User has been updated.')
                }
            } else {
                if(initialRole !== role) {
                    history.push('/admin/update-success')
                    alert.success('User has been updated.')
                } else {
                    history.push('/admin/users/superadmin')
                    alert.success('User has been updated.')
                }
            }

            dispatch({
                type: UPDATE_USER_RESET
            })
        }
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, user, userId, history])
    
    return (
        <Fragment>
            <MetaData title={'Update User'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"}>
                <div id="sidebar-wrapper" >
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">Agile Technodynamics</li>
                        <li> <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                        <li> <Link to="/admin/me"><i className="fa fa-user"></i> My Profile</Link></li>
                        <li> <Link to="/"><i className="fa fa-home"></i> Agile Homepage</Link></li>
                        <hr/>
                        <li> <Link to="/admin/users/admin"><i className="fa fa-users"></i> Admins</Link></li>
                        <li> <Link to="/admin/users/superadmin"><i className="fa fa-user-circle"></i> Superadmins</Link></li>
                        <li> <Link to="/register"><i className="fa fa-user-plus"></i> Register</Link></li>
                        <hr/>
                        <li> <Link to="/admin/help"><i className="fa fa-question-circle"></i> Help</Link></li>
                        <li className="text-danger" onClick={logoutHandler}> <Link to="/"><i className="fa fa-sign-out"></i> Log out</Link></li>
                    </ul>
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}>
                            <i className="fa fa-bars"></i>
                        </a>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Discard Changes?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to discard your changes?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => discardChanges(initialRole)}>
                                    Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Fragment>
                            <div className="login-clean">
                                <form method="put" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <h2 className="sr-only">Update User</h2>
                                    <div className="div-forgot-password">
                                        <h3 className="forgot-password-heading">Update User</h3>
                                    </div>
                                    <div className="form-group">
                                        <h6>Name</h6>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="name"
                                            value={name}
                                            placeholder="Name"
                                            pattern="[A-Za-z.\s]{1,}"
                                            style={{width: '100%'}}
                                            onChange={e => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Contact Number</h6>
                                        <input
                                            type="text" 
                                            className="form-control" 
                                            name="contactNumber"
                                            value={contactNumber}
                                            placeholder="09xx-xxx-xxxx" 
                                            pattern="^[0][9]\d{2}-\d{3}-\d{4}$"
                                            onChange={e => setContactNumber(e.target.value)}
                                            height='55px'
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Address</h6>
                                        <textarea
                                            type="text" 
                                            className="form-control" 
                                            name="address"
                                            value={address}
                                            placeholder="Address"
                                            style={{width: '100%', height: '150px'}}
                                            onChange={e => setAddress(e.target.value)}
                                            height='55px'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Role</h6>
                                        <div className="dropdown show">
                                            <select 
                                                name="role" 
                                                className="product-dropdown" 
                                                id="role"
                                                value={role}
                                                onChange={e => setRole(e.target.value)}
                                                required
                                            >
                                                {roles.map(role => (
                                                    <option key={role} value={role}>{role}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            className="btn btn-primary btn-block" 
                                            type="submit"
                                            disabled={loading ? true : false}
                                        >
                                            Update User
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <a
                                            className="btn btn-secondary btn-block mt-2"
                                            onClick={handleShow}
                                            style={{color: 'white'}}
                                        >Discard</a>
                                    </div>
                                </form>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default UpdateUser