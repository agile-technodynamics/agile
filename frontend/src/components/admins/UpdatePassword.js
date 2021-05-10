import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { Popover, OverlayTrigger, Modal, Button } from 'react-bootstrap'
import { updatePassword, clearErrors, logout } from './../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Password Requirements</Popover.Title>
      <Popover.Content>
          &bull; Minimum of <strong>6 characters</strong>. <br/>
          &bull; Must have at least 1 <strong>Uppercase and Lowercase</strong> letter.<br/>
          &bull; Must have at least 2 <strong>numeric digits</strong>.<br/>
          &bull; Must have <strong>no spaces</strong>.
      </Popover.Content>
    </Popover>
)

const UpdatePassword = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, isUpdated, loading } = useSelector(state => state.user)
    const { user } = useSelector(state => state.auth)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isToggled, setToggled] = useState('false')
    const [showOld, setOld] = useState('false')
    const [showNew, setNew] = useState('false')
    const [show, setShow] = useState(false)

    const showOldToggle = () => setOld(!showOld)
    const showNewToggle = () => setNew(!showNew)
    const handleToggle = () => setToggled(!isToggled)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }
    
    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('oldPassword', oldPassword)
        formData.set('newPassword', newPassword)

        dispatch(updatePassword(formData))
    }
    
    const discardChanges = () => {
        handleClose()
        window.history.back()
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

        if(isUpdated){
            history.push('/admin/me')
            alert.success('Password updated successfully.')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, isUpdated])
    
    return (
        <Fragment>
            <MetaData title={'Change Password'}/>
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
                        <div style={{width: '100%', height: '40px', position: 'fixed', background: 'white'}}>
                            <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}>
                                <i className="fa fa-bars"></i>
                            </a>
                            <button className="btn btn-primary" onClick={handleShow} style={{marginLeft: '35px', marginTop: '5px', fontSize: '12px', background: 'transparent', color: '#0d163f', border: 'none', position: 'fixed', zIndex: '999'}}>
                                <i className="fa fa-arrow-left fa-inverse" style={{color: '#0d163f'}}></i> Back
                            </button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Discard Changes?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to discard your changes?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={discardChanges}>
                                    Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="login-clean" style={{paddingTop: '65px'}}>
                            <form method="post" onSubmit={submitHandler}>
                                <h2 className="sr-only">Change Password</h2>
                                <div className="div-forgot-password">
                                    <h3 className="forgot-password-heading">Change Password 
                                        <span className='fa-xs' style={{margin: 'auto', paddingLeft: '15px'}}>
                                            <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                <i class="fa fa-question-circle" aria-hidden="true"></i>
                                            </OverlayTrigger>
                                        </span>
                                    </h3>
                                </div>
                                <div className="form-group">
                                    <h6>Old Password</h6>
                                    <div class="input-group mb-3">
                                        <input 
                                            type={showOld ? "password" : "text"} 
                                            className="form-control" 
                                            name="oldPassword"
                                            value={oldPassword}
                                            placeholder="Old Password"
                                            onChange={e => setOldPassword(e.target.value)}
                                            aria-label="oldpassword" aria-describedby="basic-addon1"
                                            required
                                        />
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <a
                                                    onClick={showOldToggle}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    <span className="fa-lg">
                                                        <i className={showOld ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <h6>New Password</h6>
                                    <div class="input-group mb-3">
                                        <input
                                            type={showNew ? "password" : "text"} 
                                            className="form-control"
                                            name="newPassword"
                                            value={newPassword}
                                            placeholder="New Password"
                                            onChange={e => setNewPassword(e.target.value)}
                                            aria-label="newpassword" aria-describedby="basic-addon1"
                                            required
                                        />
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <a
                                                    onClick={showNewToggle}
                                                    style={{cursor: 'pointer'}}
                                                >
                                                    <span className="fa-lg">
                                                        <i className={showNew ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                    </span>
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary btn-block"
                                        type="submit"
                                        disabled={loading ? true : false}
                                        style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                    >Update Password</button>
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
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
