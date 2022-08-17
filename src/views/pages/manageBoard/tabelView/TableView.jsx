import { useState } from 'react';
import { Link } from 'react-router-dom';


const TableView = ({todos, setTodos, queryValue, backup, register, selectAll}) => {

    let [selectedItem, setSelectedItem] = useState(0);

    const checkUncheckHandler = (e) => {
        const { id, checked } = e.target;
    
        if(id === 'allSelect'){
          let x = 0;
          let tempData = todos.filter((user)=> user.title.toLowerCase().includes(queryValue)).map(item => {
            if(checked){
              setSelectedItem(++x);
            }else{
              setSelectedItem(0);
            }
            return {...item, isChecked: checked};
          });
          const restData = backup.filter((user)=> !user.title.toLowerCase().includes(queryValue));
          setTodos([...tempData, ...restData]);
        }else{
            if(checked){
                selectAll.current.checked = true;
                selectAll.current.indeterminate = true;
                setSelectedItem((prev) => {
                    if(prev === (todos.length - 1)){
                        selectAll.current.indeterminate = false;
                        selectAll.current.checked = true;
                    };
                    return prev+1;
                });
            }else{
                setSelectedItem((prev) => {
                    if(prev > 1) selectAll.current.indeterminate = true;
                    
                    if(prev === 1) selectAll.current.indeterminate = false;
                    if((prev-1) === 0) selectAll.current.checked = false;
                    
                    return prev-1;
                });
            };
            
            let tempCategory = todos.map(item => item.id === id ? {...item, isChecked: checked} : item);
            setTodos(tempCategory);
        }
    };

    return (
        <div className='mt-5'>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className='text-gray-500'>
                            <th>
                                <input type="checkbox" {...register('objectIds')} id="allSelect" defaultValue="undefined" ref={selectAll} className="checkbox" onChange={checkUncheckHandler} />
                            </th>
                            <th className='text-sm font-extrabold'>Title</th>
                            <th className='font-extrabold text-sm'>Progress</th>
                            <th className='font-extrabold text-sm'>Dead Line</th>
                            <th className='font-extrabold text-sm'>Status</th>
                        </tr>
                    </thead>
                    <tbody className='table-height'>
                        {
                            todos.filter(todo => todo.title.toLowerCase().includes(queryValue)).map(todo => <tr key={todo.id}>
                                <td className='p-3'>
                                    <input type="checkbox" id={todo.id} className="checkbox" value={todo.id} {...register("objectIds")} checked={todo?.isChecked || false} onChange={checkUncheckHandler} />
                                </td>
                                <td className='p-3'>
                                    <Link to={`/progress/${todo?.id}`} className="cursor-pointer">
                                        <p className='text-lg font-semibold'>{todo.title}</p>
                                        <p className='text-xs'>{new Date(todo.createTime).toDateString()}</p>
                                    </Link>
                                </td>
                                <td className='p-3'>
                                    <span className='block text-xl leading-none pt-1 font-semibold'>{todo.completion}%</span>
                                    <progress className="progress progress-success w-10/12" value={todo.completion} max="100"></progress>   
                                </td>
                                <td className='p-3 font-semibold text-sm'>{new Date(todo.deadline).toDateString()}</td>
                                <td className='p-3'>
                                    <span className='flex content-center items-center'>
                                        {
                                            todo.completion === 0 && <span className='rounded-full w-16 py-1 text-center bg-rose-100 text-xs font-medium text-rose-500'>To Do</span>
                                        }
                                        {
                                            todo.completion > 0 && todo.completion < 100 && <span className='rounded-full w-16 py-1 text-center bg-yellow-100 text-xs font-medium text-yellow-500'>Doing</span>
                                        }
                                        {
                                            todo.completion === 100 && <span className='rounded-full w-16 py-1 text-center bg-green-100 text-xs font-medium text-green-500'>Done</span>
                                        }
                                    </span>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableView;