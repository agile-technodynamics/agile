import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Accordion, Card } from 'react-bootstrap'
import { logout } from '../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const Help = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user } = useSelector(state => state.auth)

    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => setToggled(!isToggled)
    
    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])

    return (
        <Fragment>
            <MetaData title={'Help'}/>
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
                        <Fragment>
                            <div style={{padding: '30px'}}>
                                <h1 className='mt-3 mb-3 ml-10 mr-10'>Help</h1>
                                <Accordion style={{margin: 'auto', padding: '0 0 50px 0', width: '100%'}}>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                            <strong>Managing Account</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <strong>Editing my profile</strong> <br/>
                                                    1. In the My Profile page, click the 'Edit Profile' button. You will be redirected to the Edit Profile page. <br/>
                                                    2. In the Edit Profile page, input your changes in the textboxes. <br/>
                                                    3. You may upload an avatar from your computer. <br/>
                                                    4. Click the 'Update Profile' button to apply the changes. <br/>
                                                    <br/>
                                            
                                                <strong>Changing my password</strong> <br/>
                                                    1. In the My Profile page, click the 'Change Password' button. You will be redirected to the Change Password page. <br/>
                                                    2. In the Change Password page, input your old password and new password in the textboxes. <br/>
                                                    <strong>Note: </strong> Follow the password requirements. You may hover on the
                                                    <span className='fa-s' style={{margin: 'auto', marginLeft: '2px'}}>
                                                            <i class="fa fa-question-circle" aria-hidden="true"></i>
                                                    </span> icon to reveal the password requirements. <br/>
                                                    4. Click the 'Update Password' button to apply the changes. <br/>
                                                    <br/>
                                                
                                                <strong>Deactivating my account</strong> <br/>
                                                    1. To deactivate your account, contact your administrator with 'superadmin' privileges to delete your account. <br/>
                                                    <strong>Note: </strong> Account deletion is permanent. <br/>
                                                    <br/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                                            <strong>Managing Inquiries, Appointments, and Other Concerns</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>
                                                <p style={{fontSize:'12px'}}><strong>*You must be of 'admin' account type.</strong></p>
                                                <strong>Resolving a message</strong> <br/>
                                                    1. In the Inquiries, Appointments, or Other Concerns page, click the
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-eye'></i>
                                                    </p> button to view the message. You will be redirected to the Inquiry Details page. <br/>
                                                    2. Click the 'Resolve' button to resolve a message.<br/>
                                                    3. The message will be moved to the Archives page. <br/>
                                                    <br/>
                                                <strong>Restoring a message</strong><br/>
                                                    1. In the Archives page, click the
                                                    <p className="btn btn-warning py-1 px-2 ml-2">
                                                        <i className='fa fa-undo'></i>
                                                    </p> button to directly restore the message, or you can click the 
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-eye'></i>
                                                    </p> button to view the message. You will be redirected to the Inquiry Details page.
                                                    <br/>
                                                    2. In the Inquiry Details page, click the 'Restore' button to restore a message.<br/>
                                                    3. The message will be restored to its corresponding inbox. <br/>
                                                    <br/>
                                                <strong>Moving a message to Trash</strong><br/>
                                                    1. In the Inquiries, Appointments, Other Concerns, or Archives page, click the
                                                    <p className="btn btn-danger py-1 px-2 ml-2">
                                                        <i className='fa fa-trash'></i>
                                                    </p> button to directly move the message to Trash, or you can click the 
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-eye'></i>
                                                    </p> button to view the message. You will be redirected to the Inquiry Details page.
                                                    <br/>
                                                    2. In the Inquiry Details page, click the 'Move to Trash' button to move the message.<br/>
                                                    3. The message will be moved to the Trash page. <br/>
                                                    <br/>
                                                <strong>Deleting a message</strong><br/>
                                                    1. In the Trash page, click the
                                                    <p className="btn btn-danger py-1 px-2 ml-2">
                                                        <i className='fa fa-trash'></i>
                                                    </p> button to directly delete the message from the database. <br/>
                                                        Alternatively, click the
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-eye'></i>
                                                    </p> button to view the message. You will be redirected to the Inquiry Details page. Click the 'Delete' button to permanently delete the message from the database.
                                                    <br/>
                                                    2. A confirmation box will appear. Click 'Yes, I'm sure' to delete the message.<br/>
                                                    3. The message will be permanently deleted in the database. <br/>
                                                    <br/>
                                                <strong>Emptying the Trash</strong><br/>
                                                    1. In the Trash page, click the 'Empty Trash' button located in the upper right side of the screen. <br/>
                                                    2. A confirmation box will appear. Click 'Yes, I'm sure' to delete the message.<br/>
                                                    3. All messages will be permanently deleted in the database. <br/>
                                                    <strong>Note: </strong> This button will be disbled if there are no messages in the Trash.<br/>
                                                    <br/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                                            <strong>Managing Products</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>
                                                <p style={{fontSize:'12px'}}><strong>*You must be of 'admin' account type.</strong></p>
                                                <strong>Creating a new product</strong> <br/>
                                                    1. In the Products page, click the 'New Product' button located in the upper right side of the screen. You will be redirected to the New Product page. <br/>
                                                    2. Input the <em>Name, and Description</em> in the textboxes provided. Select the <em>main category and sub category</em> of the product. <br/>
                                                    3. For the product's image, you may upload a photo from your computer or tick the checkbox to use the default image. <br/>
                                                    4. Click the 'Create' button. <br/>
                                                    <br/>
                                                <strong>Updating an existing product</strong> <br/>
                                                    1. In the Products page, click the
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-pencil'></i>
                                                    </p> button. You will be redirected to the Update Product page. <br/>
                                                    2. Input the <em>Name, and Description</em> in the textboxes provided. Select the <em>main category and sub category</em> of the product. <br/>
                                                    3. Upload the product image from your computer. <br/>
                                                    4. Click the 'Update Product' button. <br/>
                                                    <br/>
                                                <strong>Deleting a product</strong> <br/>
                                                    1. In the Products page, click the
                                                    <p className='btn btn-danger py-1 px-2 ml-2'>
                                                        <i className='fa fa-trash'></i>
                                                    </p> button.<br/>
                                                    2. A confirmation box will appear. Click 'Yes, I'm sure' to delete the product.<br/>
                                                    3. The product will be permanently deleted in the database. <br/>
                                                    <br/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                                            <strong>Managing Website Content</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="3">
                                            <Card.Body>
                                                <strong>Adding/Deleting a new detail</strong> <br/>
                                                    You cannot add or delete website content. You may only update the existing contents in the website. Contact the developers for more information.<br/>
                                                    <br/>
                                                <strong>Updating the Home page</strong> <br/>
                                                    1. In the Dashboard page, click the 'Update Home' button. You will be redirected to the Home Details page.<br/>
                                                    2. In the Home Details page, click the 
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-pencil'></i>
                                                    </p> button. You will be redirected to the Update Home page. <br/>
                                                    3. Input the <em>Description</em> in the textbox provided. <strong>Note: </strong> This textbox is disabled if you are updating the images displayed in the home page. <br/>
                                                    4. When updating the images displayed in the home page, you can upload the image from your computer. <strong>Note: </strong> This button is disabled if you are updating the descriptions displayed in the home page. <br/>
                                                    5. Click the 'Update Home' button. <br/>
                                                    <br/>
                                                <strong>Updating the About Us page</strong> <br/>
                                                    1. In the Dashboard page, click the 'Update About Us' button. You will be redirected to the About Us Details page.<br/>
                                                    2. In the About Us Details page, click the 
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-pencil'></i>
                                                    </p> button. You will be redirected to the Update About page. <br/>
                                                    3. Input the <em>Name and Description</em> in the textboxes provided. <br/>
                                                    4. Click the 'Update Information' button. <br/>
                                                    <br/>
                                                <strong>Updating the Footer information</strong> <br/>
                                                    1. In the Dashboard page, click the 'Update Footer' button located in the upper right side of the screen. You will be redirected to the Footer Details page.
                                                    2. In the Footer Details page, click the 'Update' button. You will be redirected to the Update Footer page. <br/>
                                                    3. Input the <em>Footer Title, Footer Description, Address Info, Phone Info, Cellphone Info, and Email Info</em> in the textboxes provided. <br/>
                                                    4. Click the 'Update Footer' button. <br/>
                                                    <br/>
                                                <strong>Updating the Services page</strong> <br/>
                                                    1. In the Dashboard page, click the 'Update Services' button. You will be redirected to the Services Details page.<br/>
                                                    2. In the Services Details page, click the 
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-pencil'></i>
                                                    </p> button. You will be redirected to the Update Services page. <br/>
                                                    3. Input the <em>Subtitle and Description</em> in the textboxes provided. <br/>
                                                    4. Select the <em>Icon Background and Icon</em> in the dropdown list. <br/>
                                                    5. Click the 'Update Services' button. <br/>
                                                    <br/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="4">
                                            <strong>Managing Users</strong>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="4">
                                            <Card.Body>
                                                <p style={{fontSize:'12px'}}><strong>*You must be of 'superadmin' account type.</strong></p>
                                                <strong>Registering a new account</strong> <br/>
                                                    1. In the Sidebar, click the 'Register' button. You will be redirected to the Register page.<br/>
                                                    2. In the Register page, fill out the textboxes provided. <br/>
                                                    3. In adding an avatar for the user, you may choose to upload an image from your computer or use the default image by ticking the checkbox. <br/>
                                                    4. Click the 'Register' button. <br/>
                                                    <br/>
                                                
                                                <strong>Promoting/Demoting a user account</strong> <br/>
                                                    1. In the Admins or Superadmins page, click the
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-pencil'></i>
                                                    </p> button. You will be redirected to the Update User page.<br/>
                                                    2.1. To promote an admin account to superadmin, select 'superadmin' in the Role dropdown list. <br/>
                                                    2.2. To demote a superadmin account to admin, select 'admin' in the Role dropdown list. <br/>
                                                    3. Click the 'Update User' button. <br/>
                                                    <br/>
                                                
                                                <strong>Updating a user account</strong> <br/>
                                                    1. In the Admins or Superadmins page, click the
                                                    <p className='btn btn-primary py-1 px-2 ml-2'>
                                                        <i className='fa fa-pencil'></i>
                                                    </p> button. You will be redirected to the Update User page. <br/>
                                                    2. In the Update User page, input the <em>Name, Contact Number and Address</em> in the textboxes.<br/>
                                                    3. Click the 'Update User' button. <br/>
                                                    <br/>

                                                <strong>Deleting a user account</strong> <br/>
                                                    <strong>Note: </strong> To delete a 'superadmin' account, demote the account to 'admin' first.<br/>
                                                    1. In the Admins page, click the
                                                    <p className='btn btn-danger py-1 px-2 ml-2'>
                                                        <i className='fa fa-trash'></i>
                                                    </p> button.<br/>
                                                    2. A confirmation box will appear. Click 'Yes, I'm sure' to delete the user.<br/>
                                                    3. The user will be permanently deleted in the database. <br/>
                                                    <br/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Help
