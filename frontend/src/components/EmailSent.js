import React, { Fragment, useEffect } from 'react'
import { useDispatch } from  'react-redux'
import { INSIDE_DASHBOARD_TRUE } from '../constants/dashboardConstants'
import MetaData from './layout/MetaData'
import '../css/confirmationpage.css'
import '../css/contact.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'

const EmailSent = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])
    
    return (
        <Fragment>
            <MetaData title={'Email Sent!'}/>
            <Fragment>
                <section className="confirmation-section">
                    <h1>
                        <i className="fa fa-check-circle confirm-icon"></i>
                    </h1>
                    <h1>Email Sent!</h1>
                    <h6 className="congratulations-text">
                        Check your email for the link to reset your password. If you can't find it, sometimes the message ends up in Spam.<br/>
                    </h6>
                    <a className="back-to-home" href="/">Back to Home&nbsp;<i className="fa fa-angle-right"></i></a>
                </section>
            </Fragment>
        </Fragment>
    )
}

export default EmailSent
