import { Link } from "react-router-dom";

const GridView = ({todos, setTodos, queryValue, register}) => {
  return (
    <div className="my-10">
      <div className="grid grid-cols-4 gap-4">
        {
          todos.filter(todo => todo.title.toLowerCase().includes(queryValue)).map(todo => <div key={todo.id} className='py-2 px-5 border-2 border-gray-100 rounded-lg shadow-md'>
            <div className='flex justify-between'>
              <div>
                <Link to={`/progress/${todo?.id}`} className="cursor-pointer">
                  <h4 className='uppercase text-lg font-semibold'>{todo.title}</h4>
                  <small className='text-xs'>{new Date(todo.createTime).toDateString()}</small>
                </Link>
              </div>
              <input type="checkbox" id={todo.id} value={todo.id} {...register('objectIds')} className='checkbox checkbox-sm mt-2' />
            </div>
              <div className='py-3'>
                  <span className='block text-xl leading-none pt-1 font-semibold'>{todo.completion}%</span>
                  <progress className="progress progress-success w-full" value={todo.completion} max="100"></progress>   
              </div>
              <span className='flex content-center items-center'>
                  {
                      todo.status === 'todo' && <span className='rounded-full w-16 py-1 text-center bg-rose-100 text-xs font-medium text-rose-500'>To Do</span>
                  }
                  {
                      todo.status === 'doing' && <span className='rounded-full w-16 py-1 text-center bg-yellow-100 text-xs font-medium text-yellow-500'>Doing</span>
                  }
                  {
                      todo.status === 'done' && <span className='rounded-full w-16 py-1 text-center bg-green-100 text-xs font-medium text-green-500'>Done</span>
                  }
              </span>
          </div>)
        }
      </div>
    </div>
  );
};

export default GridView;