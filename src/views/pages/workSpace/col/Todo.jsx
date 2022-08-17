import { useState } from 'react';
import { useDrop } from "react-dnd";
import { useForm } from "react-hook-form";
import ITEM_TYPE from '../../../../data/types';
import useTrelloContext from '../../../../hooks/useTrelloContext';
import { updateBoard } from '../../../../utility';
import CustomDragLayer from '../CustomDragLayer';
import Task from '../Task';

const Todo = ({boardId}) => {
    const { register, handleSubmit, reset } = useForm();
    const [toggleAddBtn, setToggleAddBtn] = useState(false);
    const {data, setData, myAllBoard} = useTrelloContext();
    const status = "todo";

    const onDropFunc = (item, monitor, status) => {
        if(item.progressStatus !== status){
            setData(prevState => {
                const restItems = prevState.todo.filter(i => i.id !== item.id);
                const newItems = prevState.todo.filter(i => i.id !== item.id).concat({ ...item, progressStatus: status })
                prevState.todo = newItems;
                console.log(restItems);
                return prevState;
            });
        };
    };

    const [{ isOver, thisItem }, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item, monitor) => {
            onDropFunc(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
            thisItem: monitor.getItem()
        })
    });

    //sort items horizontally
    const moveItemFunc = (dragIndex, hoverIndex) => {
        const item = data.todo[dragIndex];
        
        setData(prevState => {
            const newItems = prevState.todo.filter((item, index) => index !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            prevState.todo = newItems;

            return  prevState;
        });
    };

    //add new task
    const addTaskHandler = (inputValues) => {
        if(inputValues.title.length > 0){
            inputValues.id = Math.ceil(Math.random()*500);
            
            data.todo = [...data.todo, inputValues];
            
            const updatedData = myAllBoard.map(item => {
                if(item.id === boardId){
                    item.tasks = data;
                }

                return item;
            });

            setData(data);
            updateBoard(updatedData);

            reset();
        }
    }

    return (
        <div ref={drop} className='h-full flex-[1_1_40%]'>
            <div className='shadow-md bg-rose-100 p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-bold text-rose-500'>To Do</h1>
                    <span onClick={()=>{setToggleAddBtn(!toggleAddBtn)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-rose-500 hover:scale-110 hover:text-rose-700 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </span>
                </div>
                <div>
                    {
                        data.todo.length > 0 && data.todo.map((item, index) => (
                            item.progressStatus === status && (
                                <Task key={item.id} item={item} index={index} moveItemFunc={moveItemFunc}/>
                            )
                        ))
                    }
                    {
                        (isOver && thisItem.progressStatus !== status) && <div className='h-11 rounded-md shadow-md bg-white p-2 my-2'></div>
                    }
                </div>
                {
                    toggleAddBtn &&
                        <form onSubmit={handleSubmit(addTaskHandler)}>
                            <textarea id='todo' rows="3" placeholder='Add a task' {...register("title")} data-autosize="true" className="block w-full mt-3 px-3 p-2 bg-white rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none resize-none"/>
                            <input type="hidden" defaultValue="todo" {...register("progressStatus")} />
                            <button type='submit' className='btn btn-sm text-xs mt-2'>Add</button>
                            <span onClick={()=>{setToggleAddBtn(!toggleAddBtn)}} className='ml-2 text-xs hover:font-semibold cursor-pointer'>Cancel</span>
                        </form>
                }
                <CustomDragLayer/>
            </div>
        </div>
    );
};

export default Todo;