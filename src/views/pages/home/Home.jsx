import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useTrelloContext from "../../../hooks/useTrelloContext";
import { addBoard, isExists, updateBoard } from '../../../utility';
import AddBoard from "./AddBoard";
import Board from "./Board";

const Home = () => {
  const {myAllBoard, setMyAllBoard} = useTrelloContext();
  const { register, handleSubmit, reset } = useForm();
  

  useEffect(() => {
      const newData = isExists() || [];
      setMyAllBoard(newData);
  }, [setMyAllBoard]);

  const toggleFavorite = (id) => {
        const clickedObj = myAllBoard.find(todo => todo.id === id);
        
        const updatedData = myAllBoard.map(todo => {
          if(todo.id === id){
            clickedObj.favorite = !clickedObj.favorite;
          }
          return todo;
        });

        updateBoard(updatedData);
        setMyAllBoard(updatedData);
  }

  const createNewBoardHandler = (data) => {
    const newBoard = {
      id: Math.round(Math.random()*1000),
      createTime: new Date().getTime(),
      completion: 0,
      status: 'todo',
      favorite: false,
      tasks: [],
      ...data,
    }
    console.log(newBoard);
    const updatedData = addBoard(newBoard);
    setMyAllBoard(updatedData);

    reset();
}

  return (
      <div className="container mx-auto sm:px-10 px-5 my-10">
          <h1 className="text-xl font-bold mb-4">Your All Board</h1>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-2">
              <AddBoard register={register} handleSubmit={handleSubmit} createBoardHandler={createNewBoardHandler}/>
              {
                  myAllBoard.map(item => <Board key={item.id} data={item} toggleFavorite={toggleFavorite}/>)
              }
          </div>
      </div>
  );
};

export default Home;
