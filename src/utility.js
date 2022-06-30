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
        const addNewData = [...haveData, data];
        const jsonData = JSON.stringify(addNewData);
        localStorage.setItem('my-board', jsonData);
        return addNewData;
    }else{
        const newData = [data];
        const jsonData = JSON.stringify(newData);
        localStorage.setItem('my-board', jsonData);
        return newData;
    }
}

export {
    addBoard,
    isExists
};