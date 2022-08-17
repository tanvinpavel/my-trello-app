import { useContext } from 'react';
import { MyTrelloContext } from '../context/TrelloContext';

const useTrelloContext = () => {
    return useContext(MyTrelloContext);
};

export default useTrelloContext;