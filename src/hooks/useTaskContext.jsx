import { useContext } from 'react';
import { taskDataContext } from '../context/TaskContext';

const useTaskContext = () => {
    return useContext(taskDataContext);
};

export default useTaskContext;