import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, loadUser, clearErrors, logout} from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { UPDATE_PROFILE_RESET, UPDATE_PROFILE_REQUEST } from '../../constants/userConstants'
import imageCompression from 'browser-image-compression'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const UpdateProfile = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading: userLoading, user } = useSelector(state => state.auth)
    const { error, isUpdated, loading } = useSelector(state => state.user)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('images/default_avatar.png')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)

    const handleToggle = () => setToggled(!isToggled)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    const discardChanges = () => {
        handleClose()
        window.history.back()
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('name', name)
        formData.set('email', email)
        formData.set('contactNumber', contactNumber)
        formData.set('address', address)
        formData.set('avatar', avatar)

        dispatch(updateProfile(formData))
    }

    const onChange = file => {
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        
        reader.readAsDataURL(file)

        dispatch({
            type: UPDATE_PROFILE_RESET
        })
    }
    
    const handleImageUpload = e => {
        var imageFile = e.target.files[0]
      
        if(!imageFile.type.match(/image.*/)){
            dispatch({
                type: UPDATE_PROFILE_REQUEST
            })

            setAvatarPreview(user.avatar.url)
            return alert.error('Please upload an image file')
        }

        var options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }

        imageCompression(imageFile, options)
            .then(function (compressedFile) {
                onChange(compressedFile)  
            })
            .catch(function (error) {
                console.log(error.message)
            })

        dispatch({
            type: UPDATE_PROFILE_REQUEST
        })
    }

    useEffect(() => {
        if(user) {
            setName(user.name)
            setEmail(user.email)
            setContactNumber(user.contactNumber)
            setAddress(user.address)
            setAvatarPreview(user.avatar.url)
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

        if(isUpdated){
            history.push('/admin/me')
            alert.success('User updated successfully')
            dispatch(loadUser())

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, history, user, isUpdated])

    return (
        <Fragment>
            <MetaData title={'Edit Profile'}/>
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
                        <div style={{width: '100%', height: '40px', position: 'fixed', background: 'white', zIndex: '999'}}>
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
                        <div className="container">
                            <div className="main-body">
                                <h1 style={{textAlign: 'center', padding:'0 0 15px 0'}}>Edit Profile</h1>
                                {userLoading ? <Loader/> : (
                                    <Fragment>
                                        <div className="row gutters-sm">
                                            <div className="col-md-4 mb-3">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="d-flex flex-column align-items-center text-center">
                                                            <img src={avatarPreview} alt="Avatar" className="rounded-circle" width="150px" height="150px"/>
                                                            <div className="mt-3">
                                                            <hr/>
                                                            <input 
                                                                type="file" 
                                                                id="avatar" 
                                                                name="avatar" 
                                                                accept="images/*"
                                                                onChange={handleImageUpload}
                                                                style={{width: '90%'}}
                                                                required
                                                            />
                                                            <br/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card mb-3">
                                                    <div className="card-body">
                                                        <form method="post" onSubmit={submitHandler}>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                <h6 className="mb-0">Full Name</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    name="name"
                                                                    value={name}
                                                                    pattern="[A-Za-z.\s]{1,}"
                                                                    placeholder="Name"
                                                                    onChange={e => setName(e.target.value)}
                                                                    required
                                                                />
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                <h6 className="mb-0">Email</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                <input 
                                                                    type="email" 
                                                                    className="form-control" 
                                                                    name="email"
                                                                    value={email}
                                                                    placeholder="Email"
                                                                    onChange={e => setEmail(e.target.value)}
                                                                    required
                                                                />
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                <h6 className="mb-0">Phone</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control" 
                                                                    name="contactNumber"
                                                                    value={contactNumber}
                                                                    placeholder="09xx-xxx-xxxx"
                                                                    pattern="^[0][9]\d{2}-\d{3}-\d{4}$"
                                                                    onChange={e => setContactNumber(e.target.value)}
                                                                    required
                                                                />
                                                                </div>
                                                            </div>
                                                            <hr/>
                                                            <div className="row">
                                                                <div className="col-sm-3">
                                                                <h6 className="mb-0">Address</h6>
                                                                </div>
                                                                <div className="col-sm-9 text-secondary">
                                                                    <textarea 
                                                                        type="text"
                                                                        className="form-control"
                                                                        name="address"
                                                                        value={address}
                                                                        placeholder="Address"
                                                                        onChange={e => setAddress(e.target.value)}
                                                                        style={{height: '150px', minHeight: '50px'}}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <button
                                                                        className="btn btn-primary btn-block mt-5"
                                                                        type="submit"
                                                                        disabled={loading ? true : false}
                                                                        style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                                                    >Update Profile</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                            <div className="row">
                                                                <div className="col-sm-12">
                                                                    <button
                                                                        className="btn btn-secondary btn-block mt-2"
                                                                        onClick={handleShow}
                                                                    >Discard</button>
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
    )
}

export default UpdateProfile
