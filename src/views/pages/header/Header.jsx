import React from 'react';

const Header = () => {
    return (
        <div className='flex justify-between bg-slate-300'>
            <h3>My Trello</h3>
            <div>
                <span>logout</span>
            </div>
        </div>
    );
};

export default Header;