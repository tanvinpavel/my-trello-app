import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useTrelloContext from '../../../hooks/useTrelloContext';
import { isExists, updateBoard, completionPercentage } from '../../../utility';
import Doing from './col/Doing';
import Done from './col/Done';
import Todo from './col/Todo';
import './workSpace.css';

const WorkSpace = () => {
    const {data, setData, myAllBoard, setMyAllBoard} = useTrelloContext();
    const { id: boardId } = useParams();
    const [singleBoard, setSingleBoard] = useState({});
    const [search, setSearch] = useState(boardId);
    const [renameToggler, setRenameToggler] = useState(false);
    const renameRef = useRef();

    useEffect(() => {
        if(!myAllBoard.length){
                const allBoards = isExists() || [];
                let singleData = allBoards.find(({id}) => id === search);
                
                setMyAllBoard(allBoards);
                
                setData(singleData?.tasks || []);
                setSingleBoard(singleData || {});
        }else{
            let singleData = myAllBoard.find(({id}) => id === search) || {};

            setData(singleData?.tasks || []);
            setSingleBoard(singleData || {});
        }
    }, [myAllBoard, search, setData, setMyAllBoard]);

    const onDropFunc = (item, monitor, status) => {
        if(item.progressStatus !== status){
            setData(prevState => {
                const newItems = prevState.filter(i => i.id !== item.id).concat({ ...item, progressStatus: status });
                
                const updatedData = myAllBoard.map(item => {
                    if(item.id === search){
                        item.tasks = newItems;
                        const percentage = completionPercentage(item.tasks);
                        item.completion = percentage;
                        item.status = percentage === 0 ? "todo" : percentage > 0 && percentage <100 ? "doing" : percentage === 100 && 'done';
                    }
        
                    return item;
                });
                
                updateBoard(updatedData);

                return [ ...newItems ];
            });
        }else{
            const updatedData = myAllBoard.map(item => {
                if(item.id === boardId){
                    item.tasks = data;
                }
    
                return item;
            });
            updateBoard(updatedData);
        }
    };

    const moveItemFunc = (dragIndex, hoverIndex) => {
        const item = data[dragIndex];
        setData(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            
            return  [ ...newItems ];
        });
    };

    const selectHandler = (e) => {
        const id = e.target.value;
        if(id !== null){
            setSearch(id);
        }
    }

    const toggleFavorite = (id) => {
        const clickedObj = myAllBoard.find(todo => todo.id === id);
        
        const updatedData = myAllBoard.map(todo => {
            if(todo.id === id){
            clickedObj.favorite = !clickedObj.favorite;
          }
          return todo;
        });
        
        setMyAllBoard(updatedData);
        updateBoard(updatedData);
    }

    const renameToggleHandler = () => {
        setRenameToggler((prevState) => !prevState);
    }

    const renameHandler = (e) => {
        e.preventDefault();
        
        const name = renameRef.current.value;

        const updatedData = myAllBoard.map(item => {
            if(item.id === search){
                item.title = name;
            }

            return item;
        });

        updateBoard(updatedData);
        setRenameToggler(false);
    }

    const deleteSingleTask = (index, taskId) => {
        
        const updatedData = myAllBoard.map(item => {
            if(item.id === search){
                const restData = item.tasks.filter(({id}) => id !== taskId);
                setData(restData);

                item.tasks = restData;
            }
            
            return item;
        });
        
        updateBoard(updatedData);
    }

    return (
        <div className='container mx-auto mt-10 px-10'>
            {/* action bar */}
            <div className="flex items-start mb-10 gap-5">
                {
                    boardId > 0 ||
                    <select  onChange={(e)=>selectHandler(e)} className="select select-sm select-primary w-full max-w-xs">
                        <option value="null">Board</option>
                        {
                            myAllBoard.map(board => <option key={board.id} value={board.id}>{board.title}</option>)
                        }
                    </select>
                }
                
                {
                    Object.keys(singleBoard).length > 0 &&
                    <>
                        <h1 className="text-xl font-bold">Board: </h1>
                        {
                            renameToggler ?
                                <form className='flex gap-y-1 align-top flex-col' onSubmit={renameHandler}>
                                    <input type="text" name='rename' ref={renameRef}  className="text-xl font-bold border-2 border-gray-500 rounded-sm p-1" defaultValue={singleBoard?.title} />
                                    <div className='flex gap-x-2'>
                                        <button className='btn btn-xs text-xs font-normal' type='submit'>Rename</button>
                                        <button className='btn btn-xs text-xs font-normal' onClick={renameToggleHandler} type='submit'>Cancel</button>
                                    </div>
                                </form>
                            :
                                <div className='flex'>
                                    <h1 type="text" className="text-xl font-bold">{singleBoard?.title}</h1>
                                    <span className='my-[8px] pl-2' onClick={renameToggleHandler}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-violet-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </span>
                                </div>
                        }
                        <span onClick={()=>toggleFavorite(search)} className='cursor-pointer p-1 rounded-md bg-slate-600'>
                            {singleBoard?.favorite
                            ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            }
                        </span>
                    </>
                }
            </div>

            
            <div className="flex items-start gap-4 workSpace-height">
                <Todo onDropFunc={onDropFunc} moveItemFunc={moveItemFunc} deleteSingleTask={deleteSingleTask} boardId={boardId}/>
                <Doing onDropFunc={onDropFunc} moveItemFunc={moveItemFunc} deleteSingleTask={deleteSingleTask} boardId={boardId}/>
                <Done onDropFunc={onDropFunc} moveItemFunc={moveItemFunc} deleteSingleTask={deleteSingleTask} boardId={boardId}/>
            </div>
        </div>
    );
};

export default WorkSpace;