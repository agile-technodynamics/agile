import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { createInquiry, clearErrors } from './../actions/inquiryActions'
import { getFooterDetails } from '../actions/websiteActions'
import { INQUIRY_RESET } from './../constants/inquiryConstants'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'
import MetaData from './layout/MetaData'
import '../css/contact.css'

const Contact = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { success, error, loading } = useSelector(state => state.newInquiry)
    const { footerInfo } = useSelector(state => state.footerDetails)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [position, setPosition] = useState('')
    const [concernType, setConcernType] = useState('')
    const [customerMessage, setCustomerMessage] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('firstName', firstName)
        formData.set('lastName', lastName)
        formData.set('customerEmail', customerEmail)
        formData.set('companyName', companyName)
        formData.set('position', position)
        formData.set('contactNumber', contactNumber)
        formData.set('concernType', concernType)
        formData.set('customerMessage', customerMessage)

        dispatch(createInquiry(formData))
    }

    useEffect(() => {
        dispatch(getFooterDetails())

        if(success){
            history.push('/confirmation')

            dispatch({
                type: INQUIRY_RESET
            })
        } 

        if(error){ //in reducer, error: true instead of error: action.payload
            alert.error('Please complete the form.')
            dispatch(clearErrors())

            dispatch({
                type: INQUIRY_RESET
            })
        }

        console.log(loading)

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, success, error, loading, alert, history])

    return (
        <Fragment>
            <MetaData title={'Contact Us'}/>
            <Fragment>
            <div class='body-container'>
                <div class="container-contact">
                    <h1 class="brand-contact"><span>Phoenix Web Design</span></h1>
                    <div class="wrapper-contact">
                        <div class="company-info">
                            <h3>Agile Technodynamics, Inc.</h3>
                            <ul>
                                <li><i class="fa fa-home"></i> {footerInfo.addressInfo}</li>
                                <li><i class="fa fa-phone"></i> {footerInfo.phoneInfo}</li>
                                <li><i class="fa fa-envelope"></i> {footerInfo.emailInfo}</li>
                            </ul>
                        </div>
                        <div class="contact">
                            <h2 style={{textAlign: 'center', paddingBottom: '10px', fontWeight: 'bolder'}}>CONTACT US</h2>
                            <form id="contact-form" method='post' onSubmit={submitHandler} encType='application/json'>
                                <p>
                                    <label>First Name</label>
                                    <input 
                                        name="firstname" 
                                        type="text" 
                                        className="feedback-input" 
                                        placeholder="First Name" 
                                        value={firstName}
                                        pattern="[A-Za-z\s]{1,}"
                                        onChange={e => setFirstName(e.target.value)}
                                        required
                                    />
                                </p>
                                <p>
                                    <label>Last Name</label>
                                    <input 
                                        name="lastname" 
                                        type="text" 
                                        className="feedback-input" 
                                        placeholder="Last Name" 
                                        pattern="[A-Za-z\s]{1,}"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        required
                                    />
                                </p>
                                <p>
                                    <label>Company Name</label>
                                    <input 
                                        name="companyname" 
                                        type="text" 
                                        className="feedback-input" 
                                        placeholder="Company Name" 
                                        value={companyName}
                                        onChange={e => setCompanyName(e.target.value)}
                                        required
                                    />
                                </p>
                                <p>
                                    <label>Company Position</label>
                                    <input 
                                        name="position" 
                                        type="text" 
                                        className="feedback-input" 
                                        placeholder="Position" 
                                        value={position}
                                        onChange={e => setPosition(e.target.value)}
                                        required
                                    />
                                </p>
                                <p>
                                    <label>E-mail Address</label>
                                    <input 
                                        name="email" 
                                        type="email" 
                                        className="feedback-input" 
                                        placeholder="Email" 
                                        value={customerEmail}
                                        onChange={e => setCustomerEmail(e.target.value)}
                                        required
                                    />
                                </p>
                                <p>
                                    <label>Phone Number</label>
                                    <input 
                                        name="contactnumber" 
                                        type="tel" 
                                        className="feedback-input" 
                                        placeholder="09xx-xxx-xxxx" 
                                        pattern="^[0][9]\d{2}-\d{3}-\d{4}$"
                                        value={contactNumber}
                                        onChange={e => setContactNumber(e.target.value)}
                                        required
                                    />
                                </p>
                                <p class="full">
                                    <label>Concern Type</label>
                                    <select 
                                        name="concern" 
                                        className="concern-dropdown" 
                                        value={concernType}
                                        onChange={e => setConcernType(e.target.value)}
                                        required
                                    >
                                        <option>-</option>
                                        <option value="Inquiry">Inquiry</option>
                                        <option value="Appointment">Appointment</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </p>
                                <p class="full">
                                    <label>Message</label>
                                    <textarea 
                                        name="message" 
                                        rows="5" 
                                        id="message" 
                                        placeholder="Message" 
                                        value={customerMessage}
                                        onChange={e => setCustomerMessage(e.target.value)}
                                    ></textarea>
                                </p>
                                <p class="full">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading ? true : false}
                                        style={loading ? {pointerEvents: 'none'} : {cursor: 'pointer'}}
                                        >Submit</button>
                                </p>
                            </form>
                        </div>
                    </div>
                    </div>
            </div>
            </Fragment>
        </Fragment>
    )
}

export default Contact