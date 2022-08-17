function isExists() {
    const data = localStorage.getItem('my-board');
    if(data){
        return JSON.parse(data);
    }else{
        return false;
    }
}

function addBoard(data){
    const haveData = isExists();

    if(haveData){
        const updatedData = [...haveData, data];
        const jsonData = JSON.stringify(updatedData);
        localStorage.setItem('my-board', jsonData);
        return updatedData;
    }else{
        const newData = [data];
        const jsonData = JSON.stringify(newData);
        localStorage.setItem('my-board', jsonData);
        return newData;
    }
}

function updateBoard(data){
    const jsonData = JSON.stringify(data);
    localStorage.setItem('my-board', jsonData);
}

function deleteBoard(data){
    const jsonData = JSON.stringify(data);
    localStorage.setItem('my-board', jsonData);
    return data;
}

function completionPercentage(data){
    const totalTask = data.length;
    const totalDoingTask = data.filter(({progressStatus}) => progressStatus === 'doing').length;
    const totalDoneTask = data.filter(({progressStatus}) => progressStatus === 'done').length;

    const percentageRate = 50 / totalTask;

    const totalCompletion = (percentageRate * totalDoingTask) + ((percentageRate*2) * totalDoneTask);

    return Math.round(totalCompletion);
}

export {
    addBoard,
    isExists,
    updateBoard,
    deleteBoard,
    completionPercentage
};