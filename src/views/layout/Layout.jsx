import React from 'react';
import Footer from '../pages/footer/Footer';
import Header from '../pages/header/Header';
import {Outlet} from 'react-router-dom';

const Layout = (props) => {
    return (
        <>
            <header>
                <Header/>
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
};

export default Layout;