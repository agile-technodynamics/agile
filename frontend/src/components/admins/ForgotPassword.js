import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { forgotPassword, clearErrors } from '../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { FORGOT_PASSWORD_RESET } from '../../constants/userConstants'
import MetaData from '../layout/MetaData'
import '../../css/forms.css'

const ForgotPassword = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, message } = useSelector(state => state.forgotPassword)
    
    const [email, setEmail] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('email', email)

        dispatch(forgotPassword(formData))
    }

    const goBack = () => {
        window.history.back()
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: FORGOT_PASSWORD_RESET
            })
        }

        if(message){
            //alert.success(message)
            history.push('/email-sent')
            dispatch({
                type: FORGOT_PASSWORD_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, message, history])

    return (
        <Fragment>
            <MetaData title={'Forgot Password'}/>
            <div className="login" style={{paddingTop: '100px'}}>
                <form onSubmit={submitHandler}>
                    <h2 className="sr-only">Forgot Password</h2>
                    <div className="div-forgot-password">
                        <h3 className="forgot-password-heading">Forgot password</h3>
                    </div>
                    <div className="form-group">
                        <h6>Enter email</h6>
                        <input 
                            className="form-control" 
                            type="email" 
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            disabled={ loading ? true : false}
                        >Send Email</button>
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-secondary btn-block text-decoration-none"
                            style={{color: 'white'}}
                            onClick={goBack}
                        >Go Back</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default ForgotPassword
