import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { getFooterDetails, updateFooter, clearErrors } from '../../actions/websiteActions'
import { logout } from './../../actions/userActions'
import { UPDATE_FOOTER_RESET } from '../../constants/websiteConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const UpdateFooter = ({history}) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: footerLoading, error, footerInfo } = useSelector(state => state.footerDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.website)
    const { user } = useSelector(state => state.auth)

    const [footerTitle, setFooterTitle] = useState('')
    const [footerDescription, setFooterDescription] = useState('')
    const [addressInfo, setAddressInfo] = useState('')
    const [phoneInfo, setPhoneInfo] = useState('')
    const [cellphoneInfo, setCellphoneInfo] = useState('')
    const [emailInfo, setEmailInfo] = useState('')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)

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
        formData.set('footerTitle', footerTitle)
        formData.set('footerDescription', footerDescription)
        formData.set('addressInfo', addressInfo)
        formData.set('phoneInfo', phoneInfo)
        formData.set('cellphoneInfo', cellphoneInfo)
        formData.set('emailInfo', emailInfo)

        dispatch(updateFooter(formData))
    }

    const discardChanges = () => {
        handleClose()
        window.history.back()
    }

    useEffect(() => {
        if(footerInfo){
            setFooterTitle(footerInfo.footerTitle)
            setFooterDescription(footerInfo.footerDescription)
            setAddressInfo(footerInfo.addressInfo)
            setPhoneInfo(footerInfo.phoneInfo)
            setCellphoneInfo(footerInfo.cellphoneInfo)
            setEmailInfo(footerInfo.emailInfo)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_FOOTER_RESET
            })
        }

        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_FOOTER_RESET
            })
        }
        
        if(isUpdated) {
            dispatch(getFooterDetails())
            history.push('/admin/footer')
            alert.success('Footer updated successfully.')

            dispatch({
                type: UPDATE_FOOTER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, history, updateError, isUpdated, footerInfo])
    
    return (
        <Fragment>
            <MetaData title={'Update Footer'}/>
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
                            {footerLoading ? <Loader/> : (
                                <Fragment>
                                    <div className="login-clean">
                                        <form method="put" onSubmit={submitHandler} encType='multipart/form-data'>
                                            <h2 className="sr-only">Update Footer</h2>
                                            <div className="div-forgot-password">
                                                <h3 className="forgot-password-heading">Update Footer</h3>
                                            </div>
                                            <div className="form-group">
                                                <h6>Footer Title</h6>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="footerTitle"
                                                    value={footerTitle}
                                                    placeholder="Title"
                                                    style={{width: '100%'}}
                                                    onChange={e => setFooterTitle(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h6>Footer Description</h6>
                                                <textarea
                                                    type="text" 
                                                    className="form-control" 
                                                    name="footerDescription"
                                                    value={footerDescription}
                                                    placeholder="Description"
                                                    style={{width: '100%', height: '250px', minHeight: '50px'}}
                                                    onChange={e => setFooterDescription(e.target.value)}
                                                    height='55px'
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h6>Address Info</h6>
                                                <textarea 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="addressInfo"
                                                    value={addressInfo}
                                                    placeholder="Address"
                                                    style={{width: '100%', height: '150px', minHeight: '50px'}}
                                                    onChange={e => setAddressInfo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h6>Phone Info</h6>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="phoneInfo"
                                                    value={phoneInfo}
                                                    placeholder="Phone Number"
                                                    style={{width: '100%'}}
                                                    onChange={e => setPhoneInfo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h6>Cellphone Info</h6>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="cellphoneInfo"
                                                    value={cellphoneInfo}
                                                    placeholder="Cellphone Number"
                                                    style={{width: '100%'}}
                                                    onChange={e => setCellphoneInfo(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <h6>Email Info</h6>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="emailInfo"
                                                    value={emailInfo}
                                                    placeholder="Email"
                                                    style={{width: '100%'}}
                                                    onChange={e => setEmailInfo(e.target.value)}
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
                                                    Update Footer
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

export default UpdateFooter