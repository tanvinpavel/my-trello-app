import List from "./Grid";

const GridView = ({todos}) => {
    
    return (
        <div className="my-10">
            <div className="flex gap-4">
                {
                    todos.map(todo => <List key={todo.id} data={todo} />)
                }
            </div>
        </div>
    );
};

export default GridView;