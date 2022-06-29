import { useEffect, useState } from "react";
import AddBoard from "./AddBoard";
import Board from "./Board";

const Home = () => {
  const [todos, setTodo] = useState([]);
  const [backup, setBackup] = useState([]);
  useEffect(() => {
    fetch('./api.json')
      .then(res => res.json())
      .then(data => {
        setTodo(data);
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
  return (
      <div className="container mx-auto px-10 mt-10">
          <h1 className="text-xl font-bold mb-4">Your All Board</h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row gap-4">
              <AddBoard/>
              {
                  todos.map(item => <Board data={item} toggleFavorite={toggleFavorite}/>)
              }
          </div>
      </div>
  );
};

export default Home;
