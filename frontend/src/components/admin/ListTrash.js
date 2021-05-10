import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInquiry, updateInquiry, listInquiry, clearErrors } from '../../actions/inquiryActions'
import { logout } from './../../actions/userActions'
import { DELETE_INQUIRY_RESET, UPDATE_INQUIRY_RESET } from '../../constants/inquiryConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const ListTrash = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, inquiries } = useSelector(state => state.listInquiry)
    const { deleteError, isUpdated, isDeleted } = useSelector(state => state.inquiry)
    const { user } = useSelector(state => state.auth)

    const [isToggled, setToggled] = useState('false')
    const [id, setId] = useState('')
    const [show, setShow] = useState(false)
    const [emptyShow, setEmptyShow] = useState(false)
    const [deleteAll, setDeleteAll] = useState(false)

    const handleToggle = () => setToggled(!isToggled)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleEmptyClose = () => setEmptyShow(false)
    const handleEmptyShow = () => setEmptyShow(true)

    const logoutHandler = () => {
        dispatch(logout())

        alert.success('Logged out successfully')
    }

    const updateInquiryHandler = (id, inquiryStatus) => { 
        const formData = new FormData()
        formData.set('inquiryStatus', inquiryStatus)

        alert.success('Message has been restored.')
        dispatch(updateInquiry(id, formData))
    }

    const deleteInquiryHandler = (id) => {
        handleClose()
        dispatch(deleteInquiry(id))
    }

    const emptyTrash = () => {
        setDeleteAll(true)

        let deletedInquiryCount = 0

        inquiries.forEach(inquiry => {
            if(inquiry.inquiryStatus === 'Deleted') {
                deletedInquiryCount += 1
                dispatch(deleteInquiry(inquiry._id))
                deletedInquiryCount -= 1
            }
        })

        if(deletedInquiryCount === 0){
            alert.success('Trash has been emptied.') //this is working
        } 

        handleEmptyClose()
    }

    useEffect(() => {
        dispatch(listInquiry())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isUpdated){
            history.push('/admin/trash')

            dispatch({
                type: UPDATE_INQUIRY_RESET
            })
        }

        if(isDeleted && deleteAll){
            dispatch({
                type: DELETE_INQUIRY_RESET
            })
        }

        if(isDeleted && deleteAll === false){
            alert.success('Message has been deleted.')
            history.push('/admin/trash')

            dispatch({
                type: DELETE_INQUIRY_RESET
            })
        }
        
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, history, isDeleted, isUpdated, deleteError, deleteAll])

    const setInquiries = () => {
        const data = { 
            columns: [
                {
                    label: 'Concern',
                    field: 'concernType',
                    width: 110
                },
                {
                    label: 'Date / Time',
                    field: 'createdAt',
                    width: 130
                },
                {
                    label: 'Last Name',
                    field: 'lastName',
                    width: 130
                },
                {
                    label: 'First Name',
                    field: 'firstName',
                    width: 200
                },
                {
                    label: 'Company Name',
                    field: 'companyName',
                    width: 190
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150,
                    sort: 'disabled'
                }
            ],
            rows: []
         }

         inquiries.forEach(inquiry => {
             if(inquiry.inquiryStatus==='Deleted'){
                
                data.rows.push({
                    createdAt: inquiry.createdAt,
                    firstName: inquiry.firstName,
                    lastName: inquiry.lastName,
                    companyName: inquiry.companyName,
                    concernType: String(inquiry.concernType),
                    actions:
                    <Fragment>
                        <div style={{display: 'flex'}}>
                            <Link to={`/admin/inquiry/${inquiry._id}`} className='btn btn-primary py-1 px-2 ml-2'>
                                <i className='fa fa-eye'></i>
                            </Link>
                            <button className="btn btn-warning py-1 px-2 ml-2" onClick={() => updateInquiryHandler(inquiry._id, "Resolved")}>
                                <i className='fa fa-undo'></i>
                            </button>
                            <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => {
                                handleShow()
                                setId(inquiry._id)
                            }}>
                                <i className='fa fa-trash'></i>
                            </button>
                        </div>
                    </Fragment>
                 })
             }
         })

         return data
    }

    return (
        <Fragment>
            <MetaData title={'Trash'}/>
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
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Message?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete this? This cannot be undone.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => deleteInquiryHandler(id)}>
                                    Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={emptyShow} onHide={handleEmptyClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Empty Trash?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to delete ALL messages? This cannot be undone.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleEmptyClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => emptyTrash()}>
                                    Yes, I'm sure
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Fragment>
                        <div style={{padding: '30px'}}>
                            {loading? <Loader/> : (
                                <Fragment>
                                    <div style={{display: 'flex'}}>
                                        <div style={{marginRight: 'auto'}}>
                                            <h1 className='mt-3 mb-3 ml-10 mr-10'>Trash</h1>
                                        </div>
                                        <div style={{marginLeft: 'auto', marginTop: '30px'}}>
                                            <button 
                                                className='btn btn-danger btn-sm text-capitalize mb-5' 
                                                onClick={handleEmptyShow}
                                                disabled={setInquiries().rows.length === 0 ? true : false}
                                                style={setInquiries().rows.length === 0 ? {pointerEvents: 'none'} : {}}
                                            >
                                                Empty Trash
                                            </button>
                                        </div>
                                    </div>
                                    <MDBDataTableV5
                                        data={setInquiries()}
                                        entries={5}
                                        entriesOptions={[5, 10, 15, 20]}
                                        searchTop
                                        searchBottom={false}
                                        scrollX
                                        sortable={true}
                                        hover
                                    />
                                </Fragment>
                            )}
                        </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ListTrash