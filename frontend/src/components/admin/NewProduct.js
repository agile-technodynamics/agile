import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, OverlayTrigger, Tooltip} from 'react-bootstrap'
import imageCompression from 'browser-image-compression'
import { logout } from './../../actions/userActions'
import { newProduct, clearErrors } from '../../actions/productActions'
import { NEW_PRODUCT_RESET, NEW_PRODUCT_REQUEST } from '../../constants/productConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const NewProduct = ({history}) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, success } = useSelector(state => state.newProduct)
    const { user } = useSelector(state => state.auth)

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setMainCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')
    const [imagePreview, setImagePreview] = useState('https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204932/products/default-image-620x600_sdhmvy.jpg')
    const [useDefaultImage, setUseDefaultImage] = useState('')
    const [isChecked, setChecked] = useState('false')
    const [isToggled, setToggled] = useState('false')
    const [show, setShow] = useState(false)

    const categories = ['', 'Mechanical Engineering', 'DC Power Systems', 'Electrical Engineering Equipment', 'Test Equipment', 'Others']
    const me_subCategory = ['', 'Pumps and System', 'Fire Protection Systems', 'Others']
    const dc_subCategory = ['', 'Uninterrupted Power System', 'Battery Monitoring System', 'Batteries', 'Others']
    const eee_subCategory = ['', 'Transformers', 'Others']
    const te_subCategory = ['', 'Partial Discharge Detection', 'Battery Discharge Capacity Tester', 'Battery Impedance or Internal Resistance', 'Load Banks', 'Battery Test Monitor', 'Portable Direct Ground Fault Finder', 'Earth Tester or Clamp Type', 'Others']

    const checkboxCheck = () => setChecked(!isChecked)
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
        formData.set('name', name)
        formData.set('description', description)
        formData.set('category', category)

        if(String(category).includes("Others")) {
            formData.set('subcategory', "Others")
        } else {
            formData.set('subcategory', subcategory)
        }

        formData.set('useDefaultImage', useDefaultImage)
        formData.set('image', image)

        dispatch(newProduct(formData))
    }

    const onChange = e => {
        if(e.target.name === 'useDefaultImage') {
            let chkbox = document.getElementById('useDefaultImage')

            if(chkbox.checked === true) { //if changed to ===, register would not work
                setUseDefaultImage("True")
                setImagePreview('https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204932/products/default-image-620x600_sdhmvy.jpg')
            }
            else{
                setUseDefaultImage("False")
            }
        } 
    }

    const handleImageUpload = e => {
        var imageFile = e.target.files[0]
        
        if(!imageFile.type.match(/image.*/)){
            dispatch({
                type: NEW_PRODUCT_REQUEST
            })

            setImagePreview('https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615204932/products/default-image-620x600_sdhmvy.jpg')
            return alert.error('Please upload an image file')
        }

        var options = {
          maxSizeMB: 0.6,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        
        imageCompression(imageFile, options)
          .then(function (compressedFile) {
                addImage(compressedFile)  
          })
          .catch(function (error) {
            console.log(error.message)
          })

          dispatch({
              type: NEW_PRODUCT_REQUEST
          })
      }

    const addImage = file => {
        const reader = new FileReader()

        reader.onload = () => {
            if(reader.readyState === 2){
                setImagePreview(reader.result)
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(file)

        dispatch({
            type: NEW_PRODUCT_RESET
        })
    }

    const discardChanges = () => {
        handleClose()
        window.history.back()
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(success) {
            history.push('/admin/products')
            alert.success('Product created successfully.')
        
            dispatch({
                type: NEW_PRODUCT_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, success, history])

    return (
        <Fragment>
            <MetaData title={'New Product'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"}>
                <div id="sidebar-wrapper">
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
                        <Fragment>
                            <div className="login-clean">
                                <form method="post" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <h2 className="sr-only">New Product</h2>
                                    
                                    <div className="div-forgot-password">
                                        <h3 className="forgot-password-heading">New Product</h3>
                                    </div>
                                    <div className="form-group">
                                        <h6>Name</h6>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="name"
                                            value={name}
                                            placeholder="Product Name"
                                            onChange={e => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Description</h6>
                                        <textarea
                                            type="text" 
                                            className="form-control" 
                                            name="description"
                                            style={{width: '100%', height: '150px'}}
                                            value={description}
                                            placeholder="Product Description"
                                            onChange={e => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <h6>Main Category</h6>
                                        <div className="dropdown show">
                                            <select 
                                                name="mainCategory" 
                                                className="product-dropdown" 
                                                id="mainCategory"
                                                value={category}
                                                onChange={e => setMainCategory(e.target.value)}
                                                required
                                            >
                                                {categories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h6>Sub Category</h6>
                                        <div className="dropdown show">
                                            <select 
                                                name="subCategory" 
                                                className="product-dropdown" 
                                                id="subCategory"
                                                value={subcategory}
                                                disabled={(category === "" || String(category).includes("Others") ) ? true : false}
                                                onChange={e => setSubCategory(e.target.value)}
                                                required
                                            >
                                            {String(category).includes("Mechanical Engineering") ? (
                                                <Fragment>
                                                    {me_subCategory.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </Fragment>
                                            ) : ((String(category).includes("DC Power Systems") ? (
                                                <Fragment>
                                                    {dc_subCategory.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </Fragment>) : (
                                                    (String(category).includes("Electrical Engineering Equipment")) ? (
                                                        <Fragment>
                                                            {eee_subCategory.map(category => (
                                                                <option key={category} value={category}>{category}</option>
                                                            ))}
                                                        </Fragment>
                                                    ) : (
                                                        (String(category).includes("Test Equipment")) ? (
                                                            <Fragment>
                                                                {te_subCategory.map(category => (
                                                                    <option key={category} value={category}>{category}</option>
                                                                ))}
                                                            </Fragment>) : (
                                                                <Fragment>
                                                                    <option key="Others" value="Others">Others</option>
                                                                </Fragment>)
                                                    )
                                                )))
                                            }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <h6>Product Image</h6>
                                        {isChecked ? (
                                            <input 
                                                type="file" 
                                                name="image" 
                                                onChange={handleImageUpload}
                                                required
                                            />
                                        ) : (
                                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Image upload disabled</Tooltip>}>
                                                <span className="d-inline-block">
                                                    <input 
                                                        type="file" 
                                                        name="image" 
                                                        onChange={handleImageUpload}
                                                        disabled = {true}
                                                        style={{pointerEvents: 'none' }}
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
                                            &nbsp;or Use default image
                                    </div>
                                    <div className="form-group">
                                        <img 
                                            src={imagePreview} 
                                            alt={`Preview of ${name}`}
                                            className='mt-3 mr-2' 
                                            width='55' 
                                            height='52'
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button 
                                            className="btn btn-primary btn-block" 
                                            type="submit"
                                            disabled={loading ? true : false}
                                            style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                        >
                                            Create
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <a
                                            className="btn btn-secondary btn-block mt-2"
                                            onClick={handleShow}
                                            style={{color: 'white'}}
                                        >
                                            Discard
                                        </a>
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

export default NewProduct