import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { Accordion, Card } from 'react-bootstrap'
import { getAboutDetails, clearErrors } from '../actions/websiteActions'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'
import { Markup } from 'interweave'
import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import '../css/styles.css'
import '../css/bootstrap.min.css'
import '../fonts/font-awesome.min.css'

const About = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, loading, aboutCompany_title, aboutCompany_description,aboutScope_title, aboutScope_description, aboutObjectives_title, aboutObjectives_description, aboutMission_title, aboutMission_description, aboutVision_title, aboutVision_description, aboutHistory_title, aboutHistory_description } = useSelector(state => state.abouts)

    useEffect(() => {
        dispatch(getAboutDetails())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

    }, [dispatch, error, alert])

    return (
        <Fragment>
            <MetaData title={'About Us'} />
            <div className="container-fluid" style={{paddingTop: '100px'}}>
                {loading ? <Loader/> : (
                    <Fragment>
                        <div>
                            <h1 className="text-center about-text font-weight-bold">ABOUT US</h1>
                            <Accordion defaultActiveKey="0" style={{margin: 'auto', padding: '0 0 50px 0'}}>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0" className="text-center">
                                        {aboutCompany_title}
                                    </Accordion.Toggle>
                                    
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body><Markup content={aboutCompany_description}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="1" className="text-center">
                                        {aboutObjectives_title}
                                    </Accordion.Toggle>
                                    
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body><Markup content={aboutObjectives_description}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="2" className="text-center">
                                        {aboutScope_title}
                                    </Accordion.Toggle>
                                    
                                    <Accordion.Collapse eventKey="2">
                                        <Card.Body><Markup content={aboutScope_description}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="3" className="text-center">
                                        {aboutMission_title}
                                    </Accordion.Toggle>
                                    
                                    <Accordion.Collapse eventKey="3">
                                        <Card.Body><Markup content={aboutMission_description}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="4" className="text-center">
                                        {aboutVision_title}
                                    </Accordion.Toggle>
                                    
                                    <Accordion.Collapse eventKey="4">
                                        <Card.Body><Markup content={aboutVision_description}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="5" className="text-center">
                                        {aboutHistory_title}
                                    </Accordion.Toggle>
                                    
                                    <Accordion.Collapse eventKey="5">
                                        <Card.Body><Markup content={aboutHistory_description}/></Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </Fragment>
                )} 
            </div>
        </Fragment>
    )
}

export default About