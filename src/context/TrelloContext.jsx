import { createContext, useState } from 'react';

export const MyTrelloContext = createContext({});

const TrelloContext = ({children}) => {
    const [data, setData] = useState({});
    const [myAllBoard, setMyAllBoard] = useState([]);
    return (
        <MyTrelloContext.Provider value={{data, myAllBoard, setMyAllBoard, setData}}>
            {children}
        </MyTrelloContext.Provider>
    );
};

export default TrelloContext;