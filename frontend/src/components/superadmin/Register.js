import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Popover, OverlayTrigger, Tooltip, Modal, Button } from 'react-bootstrap'
import { register, clearErrors, logout } from '../../actions/userActions'
import { REGISTER_USER_RESET, REGISTER_USER_REQUEST } from '../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import imageCompression from 'browser-image-compression'
import MetaData from '../layout/MetaData'
import '../../css/profile.css'

const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Password Requirements</Popover.Title>
      <Popover.Content>
          &bull; Minimum of <strong>6 characters</strong>. <br/>
          &bull; Maximum of <strong>15 characters</strong>. <br/>
          &bull; Must have at least 1 <strong>Uppercase and Lowercase</strong> letter.<br/>
          &bull; Must have at least 2 <strong>numeric digits</strong>.<br/>
          &bull; Must have <strong>no spaces</strong>.
      </Popover.Content>
    </Popover>
)

const Register = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, isCreated } = useSelector(state => state.register)

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204943/avatars/default-avatar_uzyujj.png')
    const [useDefaultImage, setUseDefaultImage] = useState('')
    const [isChecked, setChecked] = useState('false')
    const [showOld, setOld] = useState('false')
    const [showNew, setNew] = useState('false')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)
    const [user, setUser] = useState({
        name: '',
        email: '',
        contactNumber: '',
        address: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, contactNumber, address, password, confirmPassword } = user

    const checkboxCheck = () => setChecked(!isChecked)
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
        formData.set('name', name)
        formData.set('email', email)
        formData.set('password', password)
        formData.set('confirmPassword', confirmPassword)
        formData.set('contactNumber', contactNumber)
        formData.set('address', address)
        formData.set('avatar', avatar)
        formData.set('useDefaultImage', useDefaultImage)

        dispatch(register(formData))
    }

    const onChange = e => {
        if(e.target.name === 'useDefaultImage') {
            let chkbox = document.getElementById('useDefaultImage')

            if(chkbox.checked === true) { //if changed to ===, register would not work
                setUseDefaultImage("True")
                setAvatarPreview('https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204943/avatars/default-avatar_uzyujj.png')
            }
            else{
                setUseDefaultImage("False")
            }

        } else {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }
    }

    const addAvatar = file => {
        const reader = new FileReader()
    
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(file)
        dispatch({
            type: REGISTER_USER_RESET
        })
    }

    const handleImageUpload = e => {

        var imageFile = e.target.files[0]

        if(!imageFile.type.match(/image.*/)){
            dispatch({
                type: REGISTER_USER_REQUEST
            })

            setAvatarPreview('https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204943/avatars/default-avatar_uzyujj.png')
            return alert.error('Please upload an image file')
        }

        var options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        
        imageCompression(imageFile, options)
          .then(function (compressedFile) {
                addAvatar(compressedFile)  
            })
            .catch(function (error) {
                console.log(error.message)
            })	

        dispatch({
            type: REGISTER_USER_REQUEST
        })
    }

    const discardChanges = () => {
        handleClose()
        window.history.back()
    }
    
    useEffect(() => {
        if(error){
            if(error.statusCode === 500) {
                alert.error('Please complete the form.')
                dispatch(clearErrors())
                dispatch({
                    type: REGISTER_USER_RESET
                })
            } else {
                alert.error(error)
                dispatch(clearErrors())
                dispatch({
                    type: REGISTER_USER_RESET
                })
            }
        }
        
        if(isCreated){
            alert.success('Registration successful')
            history.push('/admin/dashboard')

            dispatch({
                type: REGISTER_USER_RESET
            })
        }
        
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

    }, [dispatch, alert, error, isCreated, history])

    return (
        <Fragment>
            <MetaData title={'Register'}/>
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
                            <button className="btn btn-primary" onClick={handleShow} style={{marginLeft: '35px', marginTop: '5px', fontSize: '12px', background: 'transparent', color: '#0d163f', border: 'none', position: 'fixed', zIndex: '999', zIndex: '999'}}>
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
                            <h1 style={{textAlign: 'center', padding:'0 0 15px 0'}}>Register New User</h1>
                                <div className="row gutters-sm">
                                    <div className="col-md-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">   
                                                <div className="d-flex flex-column align-items-center text-center">
                                                    <img src={avatarPreview} alt="Admin" className="rounded-circle" width="150px" height="150px"/>
                                                    <div className="mt-3">
                                                        <hr/>
                                                        {isChecked ? (
                                                            <input 
                                                                type="file" 
                                                                id="avatar" 
                                                                name="avatar" 
                                                                accept="images/*"
                                                                onChange={handleImageUpload}
                                                                style={{width: '90%'}}
                                                                required
                                                            />
                                                        ) : (
                                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Image upload disabled</Tooltip>}>
                                                                <span className="d-inline-block">
                                                                <input 
                                                                    type="file" 
                                                                    id="avatar" 
                                                                    name="avatar" 
                                                                    accept="images/*"
                                                                    onChange={onChange}
                                                                    style={{width: '90%',  pointerEvents: 'none' }}
                                                                    disabled={true}
                                                                />
                                                                </span>
                                                            </OverlayTrigger>
                                                        )}
                                                        <br/>
                                                        <input 
                                                            type='checkbox'
                                                            id='useDefaultImage'
                                                            name='useDefaultImage'
                                                            value={useDefaultImage}
                                                            onChange={onChange}
                                                            onClick={checkboxCheck}
                                                        />
                                                            &nbsp;Use default image
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
                                                                placeholder="Name"
                                                                pattern="[A-Za-z.\s]{1,}"
                                                                onChange={onChange}
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
                                                                onChange={onChange}
                                                                required
                                                            />
                                                            </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Contact Number</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <input 
                                                                type="tel" 
                                                                className="form-control" 
                                                                name="contactNumber" 
                                                                value={contactNumber}
                                                                placeholder="09xx-xxx-xxxx"
                                                                pattern="^[0][9]\d{2}-\d{3}-\d{4}$"
                                                                onChange={onChange}
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
                                                                onChange={onChange}
                                                                placeholder="Address"
                                                                style={{height: '150px', minHeight: '50px'}}
                                                            />
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Password 
                                                                <span className='fa-m' style={{margin: 'auto', paddingLeft: '15px'}}>
                                                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                                                        <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                                    </OverlayTrigger>
                                                                </span>
                                                            </h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <div class="input-group mb-3">
                                                                <input 
                                                                    type={showOld ? "password" : "text"} 
                                                                    className="form-control" 
                                                                    name="password"
                                                                    value={password}
                                                                    placeholder="Password"
                                                                    onChange={onChange}
                                                                    aria-label="password" aria-describedby="basic-addon1"
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
                                                    </div>
                                                    <hr/>
                                                    <div className="row">
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Confirm Password</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            <div class="input-group mb-3">
                                                                <input
                                                                    type={showNew ? "password" : "text"} 
                                                                    className="form-control"
                                                                    name="confirmPassword"
                                                                    value={confirmPassword}
                                                                    placeholder="Confirm Password"
                                                                    onChange={onChange}
                                                                    aria-label="confirm"
                                                                    aria-describedby="basic-addon2"
                                                                    required
                                                                />
                                                                <div class="input-group-prepend">
                                                                    <span class="input-group-text" id="basic-addon2">
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
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <button
                                                                className="btn btn-primary btn-block mt-5"
                                                                type="submit"
                                                                disabled={loading ? true : false}
                                                                style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                                            >Register</button>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className="col-sm-12">
                                                            <button
                                                                className="btn btn-secondary btn-block mt-2"
                                                                onClick={handleShow}
                                                            >Discard</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register