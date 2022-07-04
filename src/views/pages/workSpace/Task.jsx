import React from 'react';

const Task = ({data}) => {
    return (
        <div className='flex items-center rounded-md shadow-md bg-white p-2 my-2'>
            <p>{data.title}</p>
        </div>
    );
};

export default Task;