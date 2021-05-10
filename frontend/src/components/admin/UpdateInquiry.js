import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { updateInquiry, deleteInquiry, getInquiryDetails, clearErrors } from '../../actions/inquiryActions'
import { logout } from './../../actions/userActions'
import { UPDATE_INQUIRY_RESET, DELETE_INQUIRY_RESET } from '../../constants/inquiryConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const UpdateInquiry = ({match, history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, inquiry } = useSelector(state => state.inquiryDetails)
    const {error: updateError, isUpdated, isDeleted } = useSelector(state => state.inquiry)
    const { user } = useSelector(state => state.auth)

    const [isToggled, setToggled] = useState('false')
    const [id, setId] = useState('')
    const [show, setShow] = useState(false)
    const [emptyShow, setEmptyShow] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [position, setPosition] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [concernType, setConcernType] = useState('')
    const [inquiryStatus, setInquiryStatus] = useState('')
    const [customerMessage, setCustomerMessage] = useState('')

    const inquiryId = match.params.id

    const handleToggle = () => setToggled(!isToggled)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleEmptyClose = () => setEmptyShow(false)
    const handleEmptyShow = () => setEmptyShow(true)


    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    const goBack = () => {
        window.history.back()
    }

    const updateInquiryHandler = (id, inquiryStatus) => { 
        const formData = new FormData()
        formData.set('inquiryStatus', inquiryStatus)

        if(inquiryStatus === 'Unresolved') {
            dispatch(updateInquiry(id, formData))
            alert.success('Message has been restored.')
            dispatch(getInquiryDetails(inquiryId))
            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
            window.history.back()
        } else if (inquiryStatus === 'Resolved'){
            dispatch(updateInquiry(id, formData))
            alert.success('Message has been moved to Archives.')
            dispatch(getInquiryDetails(inquiryId))
            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
            window.history.back()
        } else {
            dispatch(updateInquiry(id, formData))
            alert.success('Message has been moved to Trash.')
            dispatch(getInquiryDetails(inquiryId))
            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
            handleClose()
            window.history.back()
        }
    }

    const deleteInquiryHandler = (id) => {
        handleEmptyClose()
        dispatch(deleteInquiry(id))
        window.history.back()
    }
    
    useEffect(() => { 
        if(inquiry && inquiry._id !== inquiryId) {
            dispatch(getInquiryDetails(inquiryId))
        }
        else { 
            setFirstName(inquiry.firstName)
            setLastName(inquiry.lastName)
            setCompanyName(inquiry.companyName)
            setPosition(inquiry.position)
            setCustomerEmail(inquiry.customerEmail)
            setContactNumber(inquiry.contactNumber)
            setConcernType(inquiry.concernType)
            setInquiryStatus(inquiry.inquiryStatus)
            setCustomerMessage(inquiry.customerMessage)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(updateError){
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if(isUpdated) {
            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
            dispatch(getInquiryDetails(inquiryId))
        }

        if(isDeleted) {
            dispatch({
                type: DELETE_INQUIRY_RESET
            })
            dispatch(getInquiryDetails(inquiryId))
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, isDeleted, updateError, inquiry, inquiryId, history])

    return (
        <Fragment>
            <MetaData title={'View Message'}/>
            <div id="wrapper" className={isToggled ? null : "toggled"}>
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
                            <button className="btn btn-primary" onClick={goBack} style={{marginLeft: '35px', marginTop: '5px', fontSize: '12px', background: 'transparent', color: '#0d163f', border: 'none', position: 'fixed', zIndex: '999'}}>
                                <i className="fa fa-arrow-left fa-inverse" style={{color: '#0d163f'}}></i> Back
                            </button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Move to Trash?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to move this message to Trash?</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => updateInquiryHandler(id, "Deleted")}>
                                    Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={emptyShow} onHide={handleEmptyClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Message?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this? This cannot be undone.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleEmptyClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => deleteInquiryHandler(id)}>
                                    Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    <Fragment>
                        {loading ? <Loader/> : (
                            <section className="process-section" style={{fontSize: '100%', fontWeight: '400', lineHeight: '1.3', color: '#000', width: '100%', paddingTop: '51px'}}>
                                <table style={{width: '85%', minWidth: '150px', margin: '20px auto', backgroundColor: '#fff', padding: '30px', WebkitBorderRadius: '3px', MozBorderRadius: '3px', borderRadius: '3px', WebkitBoxShadow: '0 1px 3px rgba(0,0,0.12), 0 1px 2px rgba(0,0,0,.24)', MozBoxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)', boxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)', borderTop: 'solid 10px #1b1449'}}>
                                    <tbody>
                                        <tr>
                                            <td style={{height: '20px'}}></td>
                                        </tr>
                                        <tr>
                                            <td style={{width: '100%', padding: '15px', verticalAlign: 'top'}}>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Concern Type</span> {concernType}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Status</span> {inquiryStatus}</p>
                                                <br/>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Name</span> {firstName} {lastName}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Company and Position</span> {companyName}, {position}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Email</span> {customerEmail}</p>
                                                <p style={{margin: '0 0 10[x 0', padding: '0', fontSize: '14px'}}><span style={{display: 'block', fontWeight: 'bold', fontSize: '13px'}}>Phone</span> {contactNumber}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{padding: '0 15px'}}>
                                                <h3 style={{margin: '0 0 10px 0', padding: '0'}}>Message Content</h3>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style={{padding:'15px'}}>
                                                <p style={{fontSize: '15px', margin: '0', padding: '10px 40px', textAlign: 'justify'}}>
                                                {customerMessage}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr style={{ width: '100%'}}>
                                            <div style={{margin: '20px auto', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                                                <button 
                                                    className="btn btn-primary update-status-button align-center ml-2 mr-2" 
                                                    type="button"
                                                    style={(inquiry.inquiryStatus !== 'Unresolved' && inquiry.inquiryStatus !== 'Deleted') ? {display: 'none'} : {cursor: 'pointer'}}
                                                    onClick={() => updateInquiryHandler(inquiry._id, 'Resolved')}
                                                >
                                                    Resolve
                                                </button>
                                                <button 
                                                    className="btn btn-warning update-status-button align-center ml-2 mr-2" 
                                                    type="button"
                                                    style={(inquiry.inquiryStatus !== 'Resolved' && inquiry.inquiryStatus !== 'Deleted') ? {display: 'none'} : {cursor: 'pointer'}}
                                                    onClick={() => updateInquiryHandler(inquiry._id, 'Unresolved')}
                                                >
                                                    Restore
                                                </button>
                                                {(inquiry.inquiryStatus !== 'Deleted') ? (
                                                    <button 
                                                        className="btn btn-danger update-status-button align-center ml-2 mr-2" 
                                                        type="button"
                                                        onClick={() => 
                                                        {
                                                            handleShow()
                                                            setId(inquiry._id)
                                                        }}
                                                    >
                                                        Move To Trash
                                                    </button>
                                                ) : (
                                                    <button 
                                                        className="btn btn-danger update-status-button align-center ml-2 mr-2" 
                                                        type="button"
                                                        onClick={() => {
                                                            handleEmptyShow()
                                                            setId(inquiry._id)
                                                        }}>
                                                            Delete
                                                    </button>
                                                )}
                                            </div>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        )}
                    </Fragment>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateInquiry
