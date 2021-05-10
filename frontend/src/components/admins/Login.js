import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { access, login, clearErrors } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import '../../css/forms.css'

const Login = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loadError, loading } = useSelector(state => state.auth)
    const { accessCode } = useSelector(state => state.access)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isChecked, setChecked ] = useState('false')
    const [ userInput, setUserInput ] = useState('')
    const [ isCorrect, setIsCorrect ] = useState('false')
    const [ attempts, setAttempts ] = useState(2)

    const loginPassword = accessCode

    const checkboxCheck = () => setChecked(!isChecked)

    const passwordCheck = (userInput) => {
        if(userInput === loginPassword) {
            setIsCorrect(!isCorrect)
            alert.success('Access code is correct.')
        } else {
            setAttempts((attempts-1))

            if(attempts > 0) {
                alert.error(`You have ${attempts} attempts left`)
            } else {
                alert.error('Cannot redirect to log in page.')
                history.push('/')
            }
        }
    }

    const submitHandler = e => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    useEffect(() => {
        if(loginPassword === undefined) {
            dispatch(access())
        }

        if(isAuthenticated) {
            history.push('/admin/dashboard')
            alert.success('Logged in successfully.')
        }

        if(loadError && !isCorrect){
            alert.show(loadError)
            dispatch(clearErrors())
        } //loadError in load_user_fail

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        } //loadError in load_user_fail

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, isAuthenticated, loadError, error, loginPassword, history])

    return (
        <Fragment>
            <MetaData title={'Log In'}/>
            <div className={isCorrect ? 'login' : 'd-none'} style={{margin: 'auto'}}>
                <form>
                    <div className="illustration">
                        <img className="login-logo" alt="company logo" src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-logo-home_nhud2z.png"/>
                    </div>
                    <div className="form-group">
                        <h6>Enter access code</h6>
                        <p style={{color: '#333', fontSize: '10px'}}>If you don't know the code, contact your administrator.</p>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="userInput"
                            value={userInput}
                            placeholder="xxxxxxxx"
                            maxLength="8"
                            onChange={e => setUserInput(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <a
                            type='button'
                            id='submitBtn'
                            className="btn btn-primary btn-block"
                            style={{color: 'white'}}
                            onClick={() => passwordCheck(userInput)}
                        >Submit</a>
                    </div>
                </form>
            </div>
            <div className={isCorrect ? 'd-none' : 'login'} style={{margin: 'auto'}}>
                <form onSubmit={submitHandler}>
                    <h2 className="sr-only">Login Form</h2>
                    <div className="illustration">
                        <img className="login-logo" alt="company logo" src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-logo-home_nhud2z.png"/>
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control" 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div class="input-group mb-3">
                            <input 
                                className="form-control" 
                                type={isChecked ? "password" : "text"}  
                                name="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="basic-addon1">
                                    <a
                                        onClick={checkboxCheck}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <span className="fa-lg">
                                            <i className={isChecked ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                        </span>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" type="submit" disabled={loading ? true : false}>Log In</button>
                    </div>
                    <Link className="forgot" to="/password/forgot">Forgot your password?</Link>
                </form>
            </div>
        </Fragment>
    )
}

export default Login
