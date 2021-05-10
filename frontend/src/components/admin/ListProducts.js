import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { logout } from '../../actions/userActions'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const ListProducts = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.products)
    const { deleteError, isDeleted } = useSelector(state => state.product)
    const { user } = useSelector(state => state.auth)

    const [isToggled, setToggled] = useState('false')
    const [id, setId] = useState('')
    const [show, setShow] = useState(false)

    const handleToggle = () => setToggled(!isToggled)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
        handleClose()
    }

    useEffect(() => {
        dispatch(getAdminProducts())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Product has been deleted successfully.')
            history.push('/admin/products')

            dispatch({
                type: DELETE_PRODUCT_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, history, isDeleted, deleteError])

    const setProducts = () => {
        const data = { 
            columns: [
                {
                    label: 'Product Name',
                    field: 'name',
                    sort: 'asc',
                    width: 175
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc',
                    width: 300
                },
                {
                    label: 'Main Category',
                    field: 'category',
                    sort: 'asc',
                    width: 175
                },
                {
                    label: 'Sub Category',
                    field: 'subcategory',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150,
                    sort: 'disabled'
                }
            ],
            rows: []
         }

         products.forEach(product => {
             data.rows.push({
                name: product.name,
                description: product.description,
                category: product.category,
                subcategory: product.subcategory,
                actions:
                <Fragment>
                    <div style={{display: 'flex'}}>
                        <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                        <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => {
                            handleShow()
                            setId(product._id)
                        }}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </div>
                </Fragment>
             })
         })
         return data
    }
    
    return (
        <Fragment>
            <MetaData title={'Products'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"}>
                <div id="sidebar-wrapper" >
                    <ul className="sidebar-nav">
                        <li className="sidebar-brand">Agile Technodynamics</li>
                        <li> <Link to="/admin/dashboard"><i className="fa fa-tachometer"></i> Dashboard</Link></li>
                        <li> <Link to="/admin/me"><i className="fa fa-user"></i> My Profile</Link></li>
                        <li> <Link to="/"><i className="fa fa-home"></i> Agile Homepage</Link></li>
                        {user && user.role !== 'admin' ? (
                                <Fragment>
                                    <hr/>
                                        <li> <Link to="/admin/users/admin"><i className="fa fa-users"></i> Admins</Link></li>
                                        <li> <Link to="/admin/users/superadmin"><i className="fa fa-user-circle"></i> Superadmins</Link></li>
                                        <li> <Link to="/register"><i className="fa fa-user-plus"></i> Register</Link></li>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <li> <Link to="/admin/products"><i className="fa fa-shopping-bag"></i> Products</Link></li>
                                    <hr/>
                                    <li> <Link to="/admin/inquiries"><i className="fa fa-envelope"></i> Inquiries</Link></li>
                                    <li> <Link to="/admin/appointments"><i className="fa fa-archive"></i> Appointments</Link></li>
                                    <li> <Link to="/admin/others"><i className="fa fa-inbox"></i> Other Concerns</Link></li>
                                    <hr/>
                                    <li> <Link to="/admin/archives"><i className="fa fa-envelope-open"></i> Archives</Link></li>
                                    <li> <Link to="/admin/trash"><i className="fa fa-trash"></i> Trash</Link></li>
                                </Fragment>
                            )
                        }
                        <hr/>
                        <li> <Link to="/admin/help"><i className="fa fa-question-circle"></i> Help</Link></li>
                        <li className="text-danger" onClick={logoutHandler}> <Link to="/"><i className="fa fa-sign-out"></i> Log out</Link></li>
                    </ul>
                </div>
                <div className="page-content-wrapper">
                    <div className="container-fluid">
                        <a className="btn btn-link" role="button" id="menu-toggle" onClick={handleToggle}>
                            <i className="fa fa-bars"></i>
                        </a>
                        <Fragment>
                            <div style={{padding: '30px'}}>
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: 'auto'}}>
                                        <h1 className='mt-3 mb-3 ml-10 mr-10'>Products</h1>
                                    </div>
                                    <div style={{marginLeft: 'auto', marginTop: '30px'}}>
                                        <Link to='/admin/newProduct'>
                                            <button className='btn btn-success btn-sm text-capitalize mb-5'>
                                                New Product
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Product?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>Are you sure you want to delete this product? This cannot be undone.</Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={() => deleteProductHandler(id)}>
                                            Yes, I'm sure
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                {loading ? <Loader/> : (
                                    <MDBDataTableV5
                                        data={setProducts()}
                                        entries={5}
                                        entriesOptions={[5, 10, 15, 20]}
                                        searchTop
                                        searchBottom={false}
                                        scrollX
                                        sortable={true}
                                        hover
                                    />
                                )}
                            </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ListProducts
