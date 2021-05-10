import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useSelector, useDispatch } from 'react-redux'
import { getHomes, clearErrors } from '../actions/websiteActions'
import { INSIDE_DASHBOARD_FALSE } from '../constants/dashboardConstants'
import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import '../css/styles.css'

const Home = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading,
            error,
            productsDescription,
            servicesDescription,
            productImageLeft,
            productImageRight,
            titleBackground,
            servicesBackground
        } = useSelector(state => state.homes)

    useEffect(() => {
        dispatch(getHomes())

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    return (
            <Fragment>
                <MetaData title={'Home'}/>
                {loading ? <Loader/> : (
                    <Fragment>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center"
                                    style={{
                                    background: "linear-gradient(to bottom, rgba(216, 203, 194, 0.8) 0%, rgba(34, 33, 32, 0.8) 100%), url("+`${titleBackground}`+") center / auto no-repeat", 
                                    backgroundSize: "cover", 
                                    width: "100%", 
                                    height: "100%"}
                                }>
                                    <div className="main-section">
                                        <img className="logo" alt="Logo of Agile Technodynamics, Inc." src="https://res.cloudinary.com/agiletechnodynamicsinc/image/upload/v1615205387/websiteImages/agile-logo-home_nhud2z.png"/>
                                        <h1 className="pt-3 main-text">AGILE TECHNODYNAMICS, INC.</h1>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="row agile-products-home">
                                    <div className="col">
                                        <h1>Our Products</h1>
                                        <p className="our-products-description pb-3" >{productsDescription}</p>
                                        <Link className="mt-4" to="/products">See Products <i className="fa fa-angle-right"></i></Link>
                                    </div>
                                </div>
                                <div className="row" style={{margin: 'auto'}}>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="product-container" style={{background: "url("+`${productImageLeft}`+") center / auto no-repeat", backgroundSize: 'contain'}}></div>
                                    </div>
                                    <div className="col-sm-12 col-md-6">
                                        <div className="product-container" style={{background: "url("+`${productImageRight}`+") center / auto no-repeat", backgroundSize: 'contain'}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row services-container" 
                                style={{
                                    background: "linear-gradient(to right, rgb(0,0,0) 0%, rgba(151,161,179,0.4) 100%), url("+`${servicesBackground}`+") no-repeat", 
                                    backgroundSize: "cover", 
                                    backgroundPosition: "right"
                                }}
                            >
                                <div className="col-sm-12 col-md-6">
                                    <div>
                                        <div className="col-auto our-services-description">
                                            <h1 className="text-center">Our Services</h1>
                                            <p>{servicesDescription}</p>
                                            <Link className="mt-4" to="/services" style={{color: 'white'}}>See Services <i className="fa fa-angle-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
        </Fragment>
    )
}

export default Home