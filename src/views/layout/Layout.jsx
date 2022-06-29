import { Outlet } from 'react-router-dom';
import Footer from '../pages/footer/Footer';
import Header from '../pages/header/Header';
import Sidebar from '../pages/sidebar/Sidebar';

const Layout = (props) => {
    return (
        <>
            <header className='border-b-2'>
                <Header/>
            </header>
            <main className='flex'>
                <aside className='full-screen flex-auto w-2/12 border-r-2 overflow-y-auto'>
                    <Sidebar/>
                </aside>
                <section className='flex-auto w-10/12'>
                    <Outlet/>
                </section>
            </main>
            <footer>
                <Footer/>
            </footer>
        </>
    );
};

export default Layout;