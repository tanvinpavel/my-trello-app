import React, { useEffect, useState } from 'react';
import GridView from '../gridView/GridView';
import TableView from '../tabelView/TableView';
import { isExists } from '../../../utility';

const ManageBoard = () => {
    const [view, setView] = useState('table');
    const [queryValue, setQueryValue] = useState('');

    const [todos, setTodos] = useState([]);
    const [backup, setBackup] = useState([]);

    useEffect(() => {
        fetch('./api.json')
      .then(res => res.json())
      .then(data => {
        const newData = isExists() || [];
        setTodos([...data, ...newData]);
        setBackup(data);
      })
    }, []);

    console.log(queryValue);
    return (
        <div className='container mx-auto my-10 px-10'>
            <h1 className="text-xl font-bold mb-4">Manage Board</h1>

            {/* action bar */}
            <div className='flex justify-between'>
                <div className="form-control">
                    <div className="input-group">
                        <span className="bg-white border-2 border-gray-300 border-r-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </span>
                        <input type="text" placeholder="Search…" onChange={(e)=>setQueryValue(e.target.value)} className="input input-bordered" />
                    </div>
                </div>
                <button className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Board</button>
            </div>

            {/* action bar */}
            <div className='flex justify-between mt-10'>
                <div class="btn-group">
                    <button class="btn btn-active btn-sm text-xs">All</button>
                    <button class="btn btn-sm text-xs">Running</button>
                    <button class="btn btn-sm text-xs">Completed</button>
                </div>
                <div className="btn-group">
                    <button className={view === 'table' ? 'btn btn-sm btn-active' : 'btn btn-sm'} onClick={()=>setView('table')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                    </button>
                    <button className={view === 'grid' ? 'btn btn-sm btn-active' : 'btn btn-sm'} onClick={()=>setView('grid')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                </div>
                <div class="btn-group">
                    <button class="btn btn-sm bg-rose-700 border-rose-700 text-xs hover:bg-rose-800 hover:border-rose-900">Clear Select</button>
                    <button class="btn btn-sm text-xs">Clear Completed</button>
                    <button class="btn btn-sm text-xs">Reset</button>
                </div>
            </div>

            {/* grid view or list view */}
            {
                view === 'grid' ? <GridView queryValue={queryValue} setTodos={setTodos} backup={backup} todos={todos}/> : <TableView backup={backup} setTodos={setTodos} queryValue={queryValue} todos={todos}/>
            }
        </div>
    );
};

export default ManageBoard;