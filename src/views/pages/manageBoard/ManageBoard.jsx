import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { isExists } from '../../../utility';
import GridView from '../gridView/GridView';
import TableView from '../tabelView/TableView';


const ManageBoard = () => {
    const [view, setView] = useState('table');
    const [queryValue, setQueryValue] = useState('');
    const {register, handleSubmit} = useForm();
    const selectAll = useRef();

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

    const deleteSelectedItemHandler = (data) => {
        const {objectIds} = data;

        const restData = todos.filter(item => !objectIds.includes(item.id));
        setTodos(restData);
        selectAll.current.checked = false;
        selectAll.current.indeterminate = false;
    }

    const deleteCompletedItem = () => {
        const uncompletedItem = todos.filter(item => item.status !== 'done');
        setTodos(uncompletedItem);
        // to do persistence delete
    }

    const filterHandler = (e) => {
        const filterType = e.target.innerHTML.toLowerCase();
        const allData = backup;
        
        if(filterType === "all"){
            setTodos(backup);
        }else if(filterType === 'running'){
            let filterData = allData.filter(item => item.status === 'doing');
            setTodos(filterData);
        }else if(filterType === 'uncompleted'){
            let filterData = allData.filter(item => item.status === 'todo');
            setTodos(filterData);
        }else{
            let filterData = allData.filter(item => item.status === 'done');
            setTodos(filterData);
        }
    }

    return (
        <div className='container mx-auto my-10 px-10'>
            <h1 className="text-xl font-bold mb-4">Manage Board</h1>

            {/* action bar */}
            <div className="form-control w-5/12">
                <div className="input-group">
                    <span className="bg-white border-2 border-gray-300 border-r-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </span>
                    <input type="text" placeholder="Search…" onChange={(e)=>setQueryValue(e.target.value)} className="input input-sm w-full border-2 input-bordered" />
                </div>
            </div>

            {/* action bar */}
            <div className='flex justify-between mt-10'>
                <div className="btn-group">
                    <button onClick={filterHandler} className="btn btn-active btn-sm text-xs">All</button>
                    <button onClick={filterHandler} className="btn btn-sm text-xs">Running</button>
                    <button onClick={filterHandler} className="btn btn-sm text-xs">Completed</button>
                    <button onClick={filterHandler} className="btn btn-sm text-xs">Uncompleted</button>
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
                <div className="btn-group">
                    <button form='boardManageForm' type='submit' className="btn btn-sm bg-rose-700 border-rose-700 text-xs hover:bg-rose-800 hover:border-rose-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear Select
                    </button>
                    <button onClick={deleteCompletedItem} className="btn btn-sm text-xs">
                        Clear Completed
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* grid view or list view */}
            <form id="boardManageForm" onSubmit={handleSubmit(deleteSelectedItemHandler)}>
            {
                view === 'grid' ? <GridView queryValue={queryValue} register={register} setTodos={setTodos} backup={backup} todos={todos}/> : <TableView backup={backup} selectAll={selectAll} register={register} setTodos={setTodos} queryValue={queryValue} todos={todos}/>
            }
            </form>
        </div>
    );
};

export default ManageBoard;