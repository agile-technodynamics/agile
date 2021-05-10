import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'

const UpdateUserSuccess = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])

    return (
        <Fragment>
            <MetaData title={'User Update Success'}/>
            <Fragment>
                <section className='confirmation-section'>
                    <h1>
                        <i className="fa fa-check-circle confirm-icon"></i>
                    </h1>
                    <h1>User Updated!</h1>
                    <h6 className="congratulations-text">
                        User has been updated.<br/>
                        Go back to dashboard to continue.
                    </h6>
                    <a className="back-to-home" href="/admin/dashboard">Back to Dashboard&nbsp;<i className="fa fa-angle-right"></i></a>
                </section>
            </Fragment>
        </Fragment>
    )
}

export default UpdateUserSuccess
