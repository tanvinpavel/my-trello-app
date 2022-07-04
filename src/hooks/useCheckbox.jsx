import { useRef, useState } from 'react';

const useCheckbox = (apiData, setApiData, queryValue) => {
    const selectAllCheckbox = useRef();
    const [selectedItem, setSelectedItem] = useState(0);
    const [data, setData] = useState(apiData);
    const [backup, setBackup] = useState(apiData);

    const checkUncheckHandler = (e) => {
        const { id, checked } = e.target;
        console.log(id, checked);

        if(id === 'allSelect'){
          let x = 0;
          let tempData = data.filter((item)=> item.title.toLowerCase().includes(queryValue)).map(item => {
            if(checked){
              setSelectedItem(++x);
            }else{
              setSelectedItem(0);
            }
            return {...item, isChecked: checked};
          });
          const restData = backup.filter((item)=> !item.title.toLowerCase().includes(queryValue));
          setData([...tempData, ...restData]);
        }else{
            if(checked){
                // selectAllCheckbox.current.checked = true;
                // selectAllCheckbox.current.indeterminate = true;
                setSelectedItem((prev) => {
                    // if(prev === (apiData.length - 1)){
                    //     selectAllCheckbox.current.indeterminate = false;
                    //     selectAllCheckbox.current.checked = true;
                    // };
                    return prev+1;
                });
            }else{
                setSelectedItem((prev) => {
                    // if(prev > 1) selectAllCheckbox.current.indeterminate = true;
                    
                    // if(prev === 1) selectAllCheckbox.current.indeterminate = false;
                    // if((prev-1) === 0) selectAllCheckbox.current.checked = false;
                    
                    return prev-1;
                });
            };
            
            let tempCategory = apiData.map(item => item.id === id ? {...item, isChecked: checked} : item);
            setApiData(tempCategory);
        }
    };

    return {
        checkUncheckHandler,
        data,
        selectedItem,
        selectAllCheckbox
    }
};

export default useCheckbox;