import React, { Fragment, useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getFooterDetails, clearErrors } from '../../actions/websiteActions'
import { logout } from './../../actions/userActions'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import { UPDATE_FOOTER_RESET } from '../../constants/websiteConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const ListFooter = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, footerInfo } = useSelector(state => state.footerDetails)
    const { isUpdated } = useSelector(state => state.website)
    const { user } = useSelector(state => state.auth)

    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => setToggled(!isToggled)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch(getFooterDetails())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if(isUpdated){
            alert.success('Footer has been updated successfully.')
            history.push('/admin/footer')

            dispatch({
                type: UPDATE_FOOTER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, isUpdated, history])

    const setFooterData = () => {
        const data = { 
            columns: [
                {
                    label: 'Details',
                    field: 'text',
                }
            ],
            rows: [
                {
                    text: footerInfo.footerTitle
                },
                {
                    text: footerInfo.footerDescription
                },
                {
                    text: footerInfo.addressInfo
                },
                {
                    text: footerInfo.phoneInfo
                },
                {
                    text: footerInfo.cellphoneInfo
                },
                {
                    text: footerInfo.emailInfo
                }
            ]
         }
         return data
    }

    return (
        <Fragment>
            <MetaData title={'Footer Details'}/>
            <div id="wrapper" className={ isToggled ? null : "toggled"}>
                <div id="sidebar-wrapper">
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
                            <i className="fa fa-bars" style={{"color": "var(--gray-dark)"}}></i>
                        </a>
                        <Fragment>
                        <div style={{padding: '30px'}}>
                            <div style={{display: 'flex'}}>
                                <div style={{marginRight: 'auto'}}>
                                    <h1 className='mt-3 mb-3 ml-10 mr-10'>Footer Details</h1>
                                </div>
                                <div style={{marginLeft: 'auto', marginTop: '30px'}}>
                                    <Link to='/admin/update-footer'>
                                        <button className='btn btn-primary btn-sm text-capitalize mb-5'>
                                            Update
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            {loading ? <Loader/> : (
                                <MDBDataTableV5
                                    data={setFooterData()}
                                    paging={false}
                                    searcing={false}
                                    searchTop
                                    searchBottom={false}
                                    scrollX
                                    sortable={false}
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

export default ListFooter
