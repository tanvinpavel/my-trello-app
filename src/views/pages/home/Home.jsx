import { useEffect, useState } from "react";
import AddBoard from "./AddBoard";
import Board from "./Board";
import { addBoard, isExists } from '../../../utility';
import { useForm } from "react-hook-form";

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
      <div className="container mx-auto px-10 my-10">
          <h1 className="text-xl font-bold mb-4">Your All Board</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
              <AddBoard register={register} handleSubmit={handleSubmit} createBoardHandler={createBoardHandler}/>
              {
                  todos.map(item => <Board data={item} toggleFavorite={toggleFavorite}/>)
              }
          </div>
      </div>
  );
};

export default Home;
