import React from 'react';

const Grid = ({data}) => {
    const {id, title, completion, createTime, deadline, status} = data;
    return (
        <div className='w-4/12 py-2 px-5 border-2 border-gray-100 rounded-lg shadow-md'>
            <div className='flex justify-between'>
                <div>
                    <h4 className='uppercase font-semibold'>{title}</h4>
                    <small className='text-xs'>{new Date(createTime).toDateString()}</small>
                </div>
                <input type="checkbox" className='checkbox checkbox-sm mt-2' />
            </div>
            <div className='py-3'>
                <span className='block leading-none pt-1 font-semibold'>{completion}%</span>
                <progress class="progress progress-success w-full" value={completion} max="100"></progress>   
            </div>
            <span className='flex content-center items-center'>
                {
                    status === 'todo' && <span className='rounded-full w-16 py-1 text-center bg-rose-100 text-xs font-medium text-rose-500'>To Do</span>
                }
                {
                    status === 'doing' && <span className='rounded-full w-16 py-1 text-center bg-yellow-100 text-xs font-medium text-yellow-500'>Doing</span>
                }
                {
                    status === 'done' && <span className='rounded-full w-16 py-1 text-center bg-green-100 text-xs font-medium text-green-500'>Done</span>
                }
            </span>
        </div>
    );
};

export default Grid;