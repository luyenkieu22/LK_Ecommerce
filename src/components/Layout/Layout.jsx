import React from 'react'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Routers from '../../routers/routers.js'
import { useLocation } from 'react-router-dom'
import AdminNav from '../../admin/AdminNav.jsx'

const Layout = () => {

    const location = useLocation()

    return (
        <>
            {location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Header />}
            <div>
                <Routers />
            </div>
            <Footer />
        </>
    )
}

export default Layout