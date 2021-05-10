import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from  'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { getProductDetails, clearErrors } from './../actions/productActions'
import { INSIDE_DASHBOARD_FALSE } from './../constants/dashboardConstants'
import MetaData from './layout/MetaData'
import Loader from './layout/Loader'
import './../css/individual-product.css'

const ProductDetails = ({match}) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, product } = useSelector(state => state.productDetails)
    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setMainCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')

    const productId = match.params.id

    useEffect(() => {
        if(product && product._id !== productId) {
            dispatch(getProductDetails(productId))
        }
        else { 
            setName(product.name)
            setDescription(product.description)
            setMainCategory(product.category)
            setSubCategory(product.subcategory)
            setImage(product.image.url)
        }
        
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, product, productId])

    return (
        <Fragment>
            {loading ? <Loader/> : (
                <Fragment>
                    <MetaData title={name}/>
                    <div class="container-fluid individual-product">
                        <div class="row my-container">
                            <div class="col-sm-12 col-md-6 image-container">
                                <img width="400px" src={image} alt={`${name}`}/>
                            </div>
                            <div class="col-sm-12 col-md-6 info-container">
                                <div class="row">
                                    <div class="col">
                                        <h3>{name}</h3>
                                        <h6>{category} <i className="fa fa-angle-right"></i> {subcategory}</h6>
                                        <hr/>
                                        <h6>Description:</h6>
                                        <p style={{paddingTop: '10px'}}>{description}</p>
                                    </div>
                                </div>
                                <div class="row d-flex link">
                                    <div class="col my-link">
                                        <Link className="link-back" to="/products">
                                            Back to Products <i className="fa fa-angle-right"></i>
                                        </Link>
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

export default ProductDetails
