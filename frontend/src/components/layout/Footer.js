import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from './../../actions/userActions'
import { getFooterDetails, clearErrors } from '../../actions/websiteActions'
import '../../css/footer.css'
import '../../css/bootstrap.min.css'

const Footer = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { user, loading } = useSelector(state => state.auth)
    const { error, footerInfo } = useSelector(state => state.footerDetails)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch(getFooterDetails())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    return (
        <Fragment>
            <footer className="footer-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 item text">
                            <h3>{footerInfo.footerTitle}</h3>
                            <p>{footerInfo.footerDescription}</p>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Contact Info</h3>
                            <ul>
                                <li><i className="fa fa-home"></i>&nbsp;{footerInfo.addressInfo}</li>
                                <li></li>
                                <li><i className="fa fa-phone"></i>&nbsp;{footerInfo.phoneInfo}</li>
                                <li><i className="fa fa-mobile-phone"></i>&nbsp;{footerInfo.cellphoneInfo}</li>
                                <li><i className="fa fa-envelope"></i>&nbsp;{footerInfo.emailInfo}</li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Quick Links</h3>
                            <ul>
                                <li className="nav-item"><Link className="nav-link" to="/"><strong>Home</strong></Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/about-us"><strong>About Us</strong></Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/products"><strong>Products</strong></Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/services"><strong>Services</strong></Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/contact-us"><strong>Contact Us</strong></Link></li>
                                <li>&nbsp;</li>
                                <li>
                                    {user ? (
                                    <div>
                                        <Link className="" to="/">
                                            <button className="btn btn-dark btn-sm text-capitalize text-danger ml-3" type="button"  onClick={logoutHandler}>Log out</button>
                                        </Link>
                                    </div>
                                    
                                ) : !loading && <Fragment></Fragment>}
                                </li>
                            </ul>
                            
                            
                            <br/><br/>
                            
                        </div>
                    </div>
                    <p className="copyright">Agile Technodynamics, Inc © 1997</p>
                </div>
            </footer>
        </Fragment>
    )
}

export default Footer