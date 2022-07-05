import React, { useEffect } from 'react';
import useTaskContext from '../../../hooks/useTaskContext';
import Doing from './Doing';
import Done from './Done';
import Todo from './Todo';

const WorkSpace = () => {
    const {data, setData} = useTaskContext();

    useEffect(()=>{
        fetch("./api.json")
            .then(res => res.json())
            .then(data => setData(data.find(item => item.id === "1")))
    }, []);

    return (
        <div className='container mx-auto my-10 px-10'>
            <h1 className="text-xl font-bold mb-4">Project</h1>
            <div className="grid grid-cols-3 grid-rows-1 gap-4">
                <Todo/>
                <Doing/>
                <Done/>
            </div>
        </div>
    );
};

export default WorkSpace;