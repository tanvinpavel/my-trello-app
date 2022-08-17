import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useTrelloContext from '../../hooks/useTrelloContext';
import Footer from '../pages/footer/Footer';
import Header from '../pages/header/Header';
import Sidebar from '../pages/sidebar/Sidebar';
import './layout.css';

const Layout = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false); 
    const {setMyAllBoard} = useTrelloContext();
    const collapsed = () => {
        setIsCollapsed((prev) => !prev)
    }
    let count = 0;

    useEffect(()=>{
        if(count <= 1){
            const localData = localStorage.getItem('my-board');
            if(!localData){
                fetch('./api.json')
                .then(res => res.json())
                .then(data => {
                    const stringifyData = JSON.stringify(data);
                    localStorage.setItem('my-board', stringifyData);
                    setMyAllBoard(data);
                })
            }else{
                const parseData = JSON.parse(localData);
                if(!parseData.length){
                    fetch('./api.json')
                    .then(res => res.json())
                    .then(data => {
                        const stringifyData = JSON.stringify(data);
                        localStorage.setItem('my-board', stringifyData);
                        setMyAllBoard(data);
                    })
                }
            }
        }
    }, [count, setMyAllBoard]);

    return (
        <>
            <header className='border-b-2'>
                <Header/>
            </header>

            <main className='flex'>
                <aside className={`${isCollapsed ? 'w-20' : 'w-52'} duration-300 full-content-height border-r-2 relative`}>
                    {/* collapsed btn */}
                    <span onClick={collapsed} className={`${isCollapsed && 'rotate-180'} duration-500 text-gray-300 absolute cursor-pointer -right-4 top-[50%] z-10 rounded-full border-2 border-gray-300 bg-white p-2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </span>
                    <Sidebar isCollapsed={isCollapsed}/>
                </aside>

                <section className="p-7 font-semibold flex-1 full-content-height overflow-y-auto">
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