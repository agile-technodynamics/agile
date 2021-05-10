import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, ButtonGroup, Button, Dropdown } from 'react-bootstrap'
import { getProducts, clearErrors } from './../actions/productActions'
import { INSIDE_DASHBOARD_FALSE } from './../constants/dashboardConstants'
import Loader from './layout/Loader'
import MetaData from './layout/MetaData'
import './../css/bootstrap.min.css'
import './../fonts/font-awesome.min.css'

const Products = () => { 
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const [category, setMainCategory] = useState('')
    const [subcategory, setSubCategory] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    
    const me_subCategory = ['', 'Pumps and System', 'Fire Protection Systems', 'Others']
    const dc_subCategory = ['', 'Uninterrupted Power System', 'Battery Monitoring System', 'Batteries', 'Others']
    const eee_subCategory = ['', 'Transformers', 'Others']
    const te_subCategory = ['', 'Partial Discharge Detection', 'Battery Discharge Capacity Tester', 'Battery Impedance or Internal Resistance', 'Load Banks', 'Battery Test Monitor', 'Portable Direct Ground Fault Finder', 'Earth Tester or Clamp Type', 'Others']

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount
    
    if(category) {
        count = filteredProductsCount
    }

    function getName(name) {
        var x = name
        var y = x.split(' ')
        var z = x.split(' ').slice(0,5).join(' ')

        if(y.length > 5) {
            z = z + "..."
        }
        
        return z
    }

    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        dispatch(getProducts(currentPage, category, subcategory))

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, currentPage, category, subcategory])

    return (
        <Fragment>
            <MetaData title={'Our Products'}/>
            <Container fluid style={{paddingTop: '100px', margin: '0'}}>
                <Row>
                    <Col>
                        <h1 className="text-center" style={{fontWeight: 'bolder'}}>OUR PRODUCTS</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {subcategory ? 
                            <Fragment>
                                <p className="text-center product-category" style={{color: '#0d163f'}}>
                                    <a onClick={() => {
                                        setCurrentPageNo(1) 
                                        setMainCategory(category)
                                        setSubCategory('')
                                        }}  
                                        style={{textDecoration: 'underline', cursor: 'pointer'}}
                                    >{category}</a>
                                    &nbsp;
                                    <i className="fa fa-angle-right"></i> 
                                    &nbsp;
                                    {subcategory}
                                </p> 
                            </Fragment>:
                            <p className="text-center product-category" style={{color: '#0d163f'}}>
                                {category}
                            </p>
                        }
                        {category ? 
                            <li 
                                onClick={() => {setMainCategory(''); setSubCategory(''); setCurrentPage(1)}}
                                style={{listStyle: 'none', textDecoration: 'underline', cursor: 'pointer', color: '#0d163f', fontSize: '1rem', paddingBottom: '5px', width: '130px', marginLeft: 'auto', marginRight: 'auto'}}    
                            >View All Products</li> :
                            <Link></Link>
                        }
                    </Col>
                </Row>
                <hr/>
                <Row style={{padding: '20px 0 50px 0'}} noGutters={true}>
                    <Col sm={3}>
                        <h4 style={{padding: '0 13px', fontWeight: 'bold'}}>Categories</h4>
                        <ButtonGroup vertical>
                            <Dropdown as={ButtonGroup}>
                                <Button
                                    variant='transparent'
                                    style={{textAlign: 'left'}}
                                    onClick={() => {
                                        setCurrentPageNo(1) 
                                        setMainCategory('Mechanical Engineering')
                                        setSubCategory('')
                                        }
                                    }    
                                >Mechanical Engineering</Button>
                                <Dropdown.Toggle variant="transparent" id="dropdown-basic"></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {me_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('Mechanical Engineering')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        
                            <Dropdown as={ButtonGroup}>
                                <Button
                                    variant='transparent'
                                    style={{textAlign: 'left'}}
                                    onClick={() => {
                                        setCurrentPageNo(1) 
                                        setMainCategory('DC Power Systems')
                                        setSubCategory('')
                                        }
                                    }  
                                >DC Power Systems</Button>
                                <Dropdown.Toggle variant="transparent" id="dropdown-basic"></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {dc_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            key={currentActive}
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('DC Power Systems')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        
                            <Dropdown as={ButtonGroup}>
                                <Button
                                    variant='transparent'
                                    style={{textAlign: 'left'}}
                                    onClick={() => {
                                        setCurrentPageNo(1) 
                                        setMainCategory('Electrical Engineering Equipment')
                                        setSubCategory('')
                                        }
                                    }   
                                >
                                    Electrical Engineering<br/>Equipment
                                </Button>
                                <Dropdown.Toggle variant="transparent" id="dropdown-basic" split></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {eee_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            key={currentActive}
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('Electrical Engineering Equipment')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        
                            <Dropdown as={ButtonGroup}>
                                <Button
                                    variant='transparent'
                                    style={{textAlign: 'left'}}
                                    onClick={() => {
                                        setCurrentPageNo(1) 
                                        setMainCategory('Test Equipment')
                                        setSubCategory('')
                                        }
                                    }
                                >
                                    Test Equipment
                                </Button>
                                <Dropdown.Toggle variant="transparent" id="dropdown-basic" split></Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {te_subCategory.map(currentActive => (
                                        <Dropdown.Item
                                            key={currentActive}
                                            onClick={() => {
                                                setCurrentPageNo(1) 
                                                setMainCategory('Test Equipment')
                                                setSubCategory(currentActive)
                                                }
                                            }
                                        >{currentActive}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Dropdown as={ButtonGroup}>
                                <Button
                                    variant='transparent'
                                    style={{textAlign: 'left'}}
                                    onClick={() => {
                                        setCurrentPageNo(1) 
                                        setMainCategory('Others')
                                        setSubCategory('')
                                        }
                                    }
                                >
                                    Others
                                </Button>
                            </Dropdown>
                        </ButtonGroup>
                    </Col>
                    <Col sm={9} style={{padding: '10px'}}>
                        {loading ? <Loader/> : (
                            <Row style={{textAlign: 'center', paddingRight: '20px'}}>
                                {products && (products.length !== 0) ? products.map( product => (
                                    <Col style={{padding: '10px 0 15px 0', marginLeft: '10px'}}>
                                        <img src={`${product.image.url}`} height='200px' width='200px' className='mb-3'/>
                                        <br/>
                                        <Link to={`/product/${product._id}`} className="text-nowrap">
                                            {getName(product.name)}
                                        </Link>
                                    </Col>
                                )) : (
                                    <Col>
                                        <h3 style={{margin: '10px 0'}}>No products found.</h3>
                                    </Col>
                                )}
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>

            {resPerPage < count && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            )}
        </Fragment>
    )
}

export default Products