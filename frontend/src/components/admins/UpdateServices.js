import React, { Fragment, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, OverlayTrigger, Modal, Button } from 'react-bootstrap'
import { updateServices, getServiceDetails, clearErrors } from '../../actions/websiteActions'
import { logout } from '../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { UPDATE_SERVICES_RESET } from '../../constants/websiteConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Font Awesome Icons</Popover.Title>
      <Popover.Content>
            You may refer to this <a href='https://fontawesome.com/v4.7.0/icons/' target='_blank'>link</a> to the icon names.
      </Popover.Content>
    </Popover>
)

const UpdateServices = ({match, history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading: servicesLoading, error, service } = useSelector(state => state.serviceDetails)
    const { error: updateError, isUpdated, loading } = useSelector(state => state.website)
    const { user } = useSelector(state => state.auth)

    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [description, setDescription] = useState('')
    const [iconBackground, setIconBackground] = useState('')
    const [icon, setIcon] = useState('')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)

    const serviceId = match.params.id

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
        formData.set('title', title)
        formData.set('subtitle', subtitle)
        formData.set('description', description)
        formData.set('iconBackground', iconBackground)
        formData.set('icon', icon)

        dispatch(updateServices(service._id, formData))
    }

    const discardChanges = () => {
        handleClose()
        window.history.back()
    }

    useEffect(() => {
        if(service && service._id !== serviceId) {
            dispatch(getServiceDetails(serviceId))
        }
        else {
            setTitle(service.title)
            setSubtitle(service.subtitle)
            setDescription(service.description)
            setIconBackground(service.iconBackground)
            setIcon(service.icon)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_SERVICES_RESET
            })
        }
        
        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_SERVICES_RESET
            })
        }

        if(isUpdated){
            dispatch(getServiceDetails(serviceId))
            alert.success('Service updated successfully')
            history.push('/admin/service')
            dispatch({
                type: UPDATE_SERVICES_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, service, serviceId, isUpdated, updateError])
    
    return (
        <Fragment>
            <MetaData title={'Update Services'}/>
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
                    <div className="container-fluid">
                        {servicesLoading ? <Loader/> : (
                            <Fragment>
                                <div className="login-clean">
                                    <form method="put" onSubmit={submitHandler} encType='multipart/form-data'>
                                        <h2 className="sr-only">Update Services</h2>
                                        <div className="div-forgot-password">
                                            <h3 className="forgot-password-heading">Update Services </h3>
                                        </div>
                                        <div className="form-group">
                                            <h6>Title</h6>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="title" 
                                                name="title" 
                                                placeholder="Title"
                                                value={title}
                                                disabled={true}
                                                style={{backgroundColor: '#F5F5F5', color: 'gray'}}
                                                onChange={e => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <h6>Subtitle</h6>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="subtitle" 
                                                name="subtitle" 
                                                value={subtitle}
                                                disabled={true}
                                                onChange={e => setSubtitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <h6>Description</h6>
                                            <textarea
                                                type="text" 
                                                className="form-control" 
                                                name="description"
                                                value={description}
                                                placeholder="Services Description"
                                                style={{width: '100%', height: '150px', minHeight: '50px'}}
                                                onChange={e => setDescription(e.target.value)}
                                                height='55px'
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <h6>Icon Background</h6>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon2">
                                                        Color
                                                    </span>
                                                </div>
                                                <select
                                                    id="iconBackground" 
                                                    name="iconBackground" 
                                                    value={iconBackground}
                                                    aria-label="iconBackground"
                                                    aria-describedby="basic-addon2"
                                                    className="form-control" 
                                                    onChange={e => setIconBackground(e.target.value)}
                                                    required
                                                >
                                                    <option value="primary">Blue</option>
                                                    <option value="secondary">Gray</option>
                                                    <option value="success">Green</option>
                                                    <option value="info">Light Blue</option>
                                                    <option value="warning">Yellow</option>
                                                    <option value="danger">Red</option>
                                                    <option value="dark">Dark Gray</option>
                                                    <option value="indigo">Indigo</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <h6>Icon (eg. eye, check, info) 
                                                <a href='https://fontawesome.com/v4.7.0/icons/' target='_blank' className='text-dark'>
                                                    <span className='fa-m' style={{margin: 'auto', paddingLeft: '5px'}}>
                                                        <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                        </OverlayTrigger>
                                                    </span>
                                                </a>
                                            </h6>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="basic-addon1">
                                                        fa-
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="icon" 
                                                    name="icon" 
                                                    value={icon}
                                                    onChange={e => setIcon(e.target.value)}
                                                    aria-label="icon"
                                                    aria-describedby="basic-addon1"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group text-center">
                                            <h6 style={{textAlign: 'left'}}>Icon Preview</h6>
                                            <span className="fa-stack fa-4x">
                                                <i className={`fa fa-circle fa-stack-2x text-${iconBackground}`}></i>
                                                <i className={`fa fa-${icon} fa-stack-1x fa-inverse`}></i>
                                            </span>
                                        </div>
                                        <div className="form-group">
                                            <button 
                                                className="btn btn-primary btn-block" 
                                                type="submit"
                                                disabled={loading ? true : false}
                                                style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                            >
                                                Update Services
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
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdateServices
