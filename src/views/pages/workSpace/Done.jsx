import { useState } from "react";
import { useForm } from "react-hook-form";
import useTaskContext from "../../../hooks/useTaskContext";
import Task from './Task';

const Done = () => {
    const { register, handleSubmit, reset } = useForm();
    const [toggleAddBtn, setToggleAddBtn] = useState(false);
    const {data, setData} = useTaskContext();

    const addTaskHandler = (inputValues) => {
        if(inputValues.title.length > 0){
            inputValues.id = Math.ceil(Math.random()*500);
            
            const updatedTask = {...data};
            updatedTask.tasks = [...data.tasks, inputValues]

            setData(updatedTask);
            reset();
        }
    }

    return (
        <div className='rounded-md p-4 shadow-md bg-green-100'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-bold text-green-500'>Done</h1>
                <span onClick={()=>{setToggleAddBtn(!toggleAddBtn)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500 hover:text-gray-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div>{
                data?.tasks?.map(item => item.progressStatus === 'done' && <Task key={item.id} data={item}/>)
            }</div>
            {
                toggleAddBtn && <div>
                    <form onSubmit={handleSubmit(addTaskHandler)}>
                        <textarea id='done' rows="3" placeholder='Add a task' {...register("title")} data-autosize="true" className="mt-3 block w-full px-3 p-2 bg-white rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none resize-none"/>
                        <input type="hidden" defaultValue="done" {...register("progressStatus")} />
                        <button type='submit' className='btn text-xs btn-sm mt-2'>Add</button>
                        <span onClick={()=>{setToggleAddBtn(!toggleAddBtn)}} className='text-xs ml-2 hover:font-semibold cursor-pointer'>Cancel</span>
                    </form>
                </div>
            }
        </div>
    );
};

export default Done;