import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from './../../actions/userActions'
import {Navbar, Nav, Dropdown, Card } from 'react-bootstrap'
import '../../css/bootstrap.min.css'
import '../../css/styles.css'

const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }
    
    let userAvatar = ""
    let userName = ""

    if(user && user.avatar) {
        userAvatar = user.avatar.url
    } else {
        userAvatar = ""
    }

    if (user && user.name) {
        userName = user.name
    } else {
        userName = ''
    }
    
    function getFirstName() {
        let x = userName.split(' ')
        let name = x[0]
        let firstName = ''

        for (var i = 0; i < name.length; i++) {
            if(i == 8) {
                firstName += '...'
                break
            }

            firstName += name.charAt(i)
        }
        
        return firstName
    }

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light" fixed="top">
                <Navbar.Brand>
                    <Link to='/'>
                        <img className="nav-link nav-logo" alt="Agile Technodynamics, Inc." src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-header-logo_tan5lw.png"/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto justify-space-between flex-grow-1">
                        <Nav.Link  href='/' className="header-link" style={{fontWeight: 'bold', color: "rgb(13, 22, 63)"}}>
                            Home
                        </Nav.Link>
                        <Nav.Link  href='/about-us' className="header-link" style={{fontWeight: 'bold', color: "rgb(13, 22, 63)"}}>
                            About Us
                        </Nav.Link>
                        <Nav.Link  href='/products' className="header-link" style={{fontWeight: 'bold', color: "rgb(13, 22, 63)"}}>
                            Products
                        </Nav.Link>
                        <Nav.Link  href='/services' className="header-link" style={{fontWeight: 'bold', color: "rgb(13, 22, 63)"}}>
                            Services
                        </Nav.Link>
                        <Nav.Link  href='/contact-us' className="header-link" style={{fontWeight: 'bold', color: "rgb(13, 22, 63)"}}>
                            Contact Us
                        </Nav.Link>
                    </Nav>
                    {user ? (
                        <Nav inline>
                            <Dropdown className="user-dropdown">
                                <Dropdown.Toggle
                                    variant="transparent"
                                    id="dropdown-basic"
                                >
                                    <img 
                                        class='mr-2 rounded-circle'
                                        src={userAvatar}
                                        alt="Avatar"
                                        width='30' 
                                        height='32'
                                    /> {user && getFirstName()}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <Link to='/admin/dashboard'>Dashboard</Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="text-danger"
                                        onClick={() => logoutHandler()}
                                    >Log Out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    ) : <Nav></Nav>}
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
}

export default Header