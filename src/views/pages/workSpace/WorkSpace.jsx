import React, { useEffect, useState } from 'react';
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
                        item.completion =  completionPercentage(item.tasks);
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

    return (
        <div className='container mx-auto mt-10 px-10'>
            {/* action bar */}
            <div className="flex items-center mb-10 gap-5">
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
                        <h1 className="text-xl font-bold">Board: {singleBoard?.title}</h1>
                        <span onClick={()=>toggleFavorite(search)} className='cursor-pointer p-1 rounded-md bg-slate-600'>
                            {singleBoard?.favorite
                            ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:scale-110 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            }
                        </span>
                    </>
                }
            </div>

            
            <div className="flex items-start gap-4 workSpace-height">
                <Todo onDropFunc={onDropFunc} moveItemFunc={moveItemFunc} boardId={boardId}/>
                <Doing onDropFunc={onDropFunc} moveItemFunc={moveItemFunc} boardId={boardId}/>
                <Done onDropFunc={onDropFunc} moveItemFunc={moveItemFunc} boardId={boardId}/>
            </div>
        </div>
    );
};

export default WorkSpace;