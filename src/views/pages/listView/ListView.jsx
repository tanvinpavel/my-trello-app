import List from "./List";

const ListView = () => {
    const todos = [
        {
            id: '1',
            title: 'my-trello',
            description: 'simple description',
            createTime: 'Sun jan 05 2022',
            deadline: 'Wed jan 08 2022',
            status: 'todo',
        },
        {
            id: '2',
            title: 'my-trello',
            description: 'simple description',
            createTime: 'some date',
            deadline: 'some date',
            completion: 50,
            status: 'todo',
        },
        {
            id: '3',
            title: 'my-trello',
            description: 'simple description',
            createTime: 'some date',
            deadline: 'some date',
            completion: 50,
            status: 'todo',
        },
        {
            id: '4',
            title: 'my-trello',
            description: 'simple description',
            createTime: 'some date',
            deadline: 'some date',
            completion: 50,
            status: 'todo',
        }
    ]
    return (
        <div className="container mx-auto container mx-auto px-5 mt-10">
            <div className="flex flex-col gap-y-2">
                {
                    todos.map(todo => <List key={todo.id} data={todo} />)
                }
            </div>
        </div>
    );
};

export default ListView;