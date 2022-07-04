import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addBoard, isExists } from '../../../utility';
import AddBoard from "./AddBoard";
import Board from "./Board";

const Home = () => {
  const [todos, setTodo] = useState([]);
  const [backup, setBackup] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetch('./api.json')
      .then(res => res.json())
      .then(data => {
        const newData = isExists() || [];
        setTodo([...data, ...newData]);
        setBackup(data);
      })
  }, []);

  const toggleFavorite = (id) => {
        const clickedObj = todos.find(todo => todo.id === id);
        
        const updatedData = todos.map(todo => {
          if(todo.id === id){
            clickedObj.favorite = !clickedObj.favorite;
          }
          return todo;
        });
        setTodo(updatedData);
  }

  const createBoardHandler = (data) => {
    console.log(data);
    addBoard(data);
    setTodo([...todos, ...[data]]);

    reset();
}

  return (
      <div className="container mx-auto sm:px-10 px-5 my-10">
          <h1 className="text-xl font-bold mb-4">Your All Board</h1>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-2">
              <AddBoard register={register} handleSubmit={handleSubmit} createBoardHandler={createBoardHandler}/>
              {
                  todos.map(item => <Board key={item.id} data={item} toggleFavorite={toggleFavorite}/>)
              }
          </div>
      </div>
  );
};

export default Home;
