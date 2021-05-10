import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from './../layout/MetaData'
import '../../css/confirmationpage.css'
import '../../css/contact.css'
import '../../css/bootstrap.min.css'
import '../../fonts/font-awesome.min.css'

const PasswordSuccess = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])

    return (
        <Fragment>
            <MetaData title={'Change Password Success'}/>
            <Fragment>
                <section className='confirmation-section'>
                    <h1>
                        <i className="fa fa-check-circle confirm-icon"></i>
                    </h1>
                    <h1>Password Updated!</h1>
                    <h6 className="congratulations-text">
                        Password has been changed.<br/>
                        The user has automatically been logged in. Go back to home to continue.
                    </h6>
                    <a className="back-to-home" href="/">Back to Home&nbsp;<i className="fa fa-angle-right"></i></a>
                </section>
            </Fragment>
        </Fragment>
    )
}

export default PasswordSuccess
