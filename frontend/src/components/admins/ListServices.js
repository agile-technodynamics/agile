import React, { Fragment, useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTableV5 } from 'mdbreact'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getServices, clearErrors } from '../../actions/websiteActions'
import { logout } from './../../actions/userActions'
import { UPDATE_SERVICES_RESET } from '../../constants/websiteConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../constants/dashboardConstants'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import '../../css/sidebar.css'
import '../../css/sidebar-1.css'
import '../../css/bootstrap.min.css'

const ListServices = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, services } = useSelector(state => state.services)
    const { isUpdated } = useSelector(state => state.website)
    const { user } = useSelector(state => state.auth)

    const [isToggled, setToggled] = useState('false')

    const handleToggle = () => setToggled(!isToggled)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    useEffect(() => {
        dispatch(getServices())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if(isUpdated){
            alert.success('Services has been updated successfully.')
            history.push('/admin/service')

            dispatch({
                type: UPDATE_SERVICES_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, isUpdated, history])

    const setServiceData = () => {
        const data = { 
            columns: [
                {
                    label: 'Title',
                    field: 'title',
                    width: 200
                },
                {
                    label: 'Subtitle',
                    field: 'subtitle',
                    width: 150
                },
                {
                    label: 'Description',
                    field: 'description',
                    width: 350
                },
                {
                    label: 'Icon Preview',
                    field: 'icon',
                    width: 130
                },
                {
                    label: 'Edit',
                    field: 'actions',
                    width: 100
                }
            ],
            rows: []
         }

         services.forEach(service => {
            data.rows.push({
                title: service.title,
                subtitle: service.subtitle,
                description: service.description,
                icon: <Fragment>
                    <span className="fa-stack fa-2x">
                        <i className={`fa fa-circle fa-stack-2x text-${service.iconBackground}`}></i>
                        <i className={`fa fa-${service.icon} fa-stack-1x fa-inverse`}></i>
                    </span>
                </Fragment>,
                actions:
                <Fragment>
                    <div style={{display: 'flex'}}>
                        <Link to={`/admin/service/${service._id}`} className='btn btn-primary py-1 px-2 ml-2'>
                            <i className='fa fa-pencil'></i>
                        </Link>
                    </div>
                </Fragment>
             })
         })

         return data
    }

    return (
        <Fragment>
            <MetaData title={'Services Details'}/>
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
                            <i className="fa fa-bars"   ></i>
                        </a>
                        <Fragment>
                        <div style={{padding: '30px'}}>
                            <h1 className='mt-3 mb-3 ml-10 mr-10'>Services Details</h1>
                            {loading ? <Loader/> : (
                                <MDBDataTableV5
                                    data={setServiceData()}
                                    searchTop
                                    searchBottom={false}
                                    scrollX
                                    sortable={false}
                                    searching={false}
                                    paging={false}
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

export default ListServices
