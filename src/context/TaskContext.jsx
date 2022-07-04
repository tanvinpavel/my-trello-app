import { createContext, useState } from 'react';


export const taskDataContext = createContext();
const TaskContext = ({children}) => {
    const [data, setData] = useState({});
    return (
        <taskDataContext.Provider value={{data, setData}}>
            {children}
        </taskDataContext.Provider>
    );
};

export default TaskContext;