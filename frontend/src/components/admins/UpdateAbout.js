import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { updateAbout, getSingleAbout, clearErrors } from '../../actions/websiteActions'
import { logout } from './../../actions/userActions'
import { UPDATE_ABOUT_RESET } from '../../constants/websiteConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const UpdateAbout = ({match, history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: detailsLoading, error, about } = useSelector(state => state.aboutDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.website)
    const { user } = useSelector(state => state.auth)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)

    const aboutId = match.params.id
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleToggle = () => setToggled(!isToggled)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('title', title)
        formData.set('description', description)

        dispatch(updateAbout(about._id, formData))
    }

    const discardChanges = () => {
        handleClose()
        window.history.back()
    }

    useEffect(() => {
        if(about && about._id !== aboutId) {
            dispatch(getSingleAbout(aboutId))
        }
        else { 
            setTitle(about.title)
            setDescription(about.description)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_ABOUT_RESET
            })
        }

        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_ABOUT_RESET
            })
        }

        if(isUpdated) {
            history.push('/admin/about')
            dispatch(getSingleAbout(aboutId))
            alert.success('Information updated successfully.')

            dispatch({
                type: UPDATE_ABOUT_RESET
            })
        }
        
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, about, aboutId, history])
    
    return (
        <Fragment>
            <MetaData title={'Update About'}/>
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
                            {detailsLoading ? <Loader/> : (
                                <Fragment>
                                    <div className="login-clean">
                                        <form method="put" onSubmit={submitHandler} encType='multipart/form-data'   >
                                            <h2 className="sr-only">Update About: "{about.title}"</h2>
                                            <div className="div-forgot-password">
                                                <h3 className="forgot-password-heading">Update About "{about.title}"</h3>
                                            </div>
                                            <div className="form-group">
                                                <h6>Name</h6>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="title"
                                                    value={title}
                                                    placeholder="Title"
                                                    style={{width: '100%'}}
                                                    onChange={e => setTitle(e.target.value)}
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
                                                    placeholder="Description"
                                                    style={{width: '100%', height: '250px', minHeight: '50px'}}
                                                    onChange={e => setDescription(e.target.value)}
                                                    height='55px'
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button 
                                                    className="btn btn-primary btn-block" 
                                                    type="submit"
                                                    disabled={loading ? true : false}
                                                    style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                                >
                                                    Update Information
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

export default UpdateAbout
