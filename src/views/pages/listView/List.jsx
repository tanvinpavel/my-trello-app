import React from 'react';

const List = ({data}) => {
    const {id, title, description, createTime, deadline, status} = data;
    return (
        <div className='flex justify-between items-center p-2 border-2 rounded-lg'>
            <div className='flex items-center'>
                <input type="checkbox" className='checkbox checkbox-sm' />
                <div className='ml-5'>
                    <h4 className='text-sm font-medium'>{title}</h4>
                    <small className='text-xs'>{createTime}</small>
                </div>
            </div>
            <span className='rounded-full px-4 py-1 bg-yellow-100 text-xs font-medium text-yellow-500'>{status}</span>
        </div>
    );
};

export default List;