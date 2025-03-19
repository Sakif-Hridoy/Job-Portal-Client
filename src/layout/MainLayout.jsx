import React from 'react';
import Header from '../shared/Header';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../shared/Footer';

const MainLayout = () => {
    const location = useLocation();

    let showFooter = true;

    if(location.pathname === "/signin" || location.pathname === "/register"){
        showFooter = false;
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <Header></Header>
            <Outlet></Outlet>
            {showFooter && <Footer></Footer>}
        </div>
    );
};

export default MainLayout;