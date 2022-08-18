import React, { memo, useEffect, useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';
import ITEM_TYPE from '../../../data/types';

const Task = memo(({item, index, moveItemFunc, deleteSingleTask}) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ITEM_TYPE,
        collect(monitor) {
            return {
              handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
            const mousePosition = monitor.getClientOffset();
            const hoverClientY = mousePosition.y - hoveredRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveItemFunc(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: ITEM_TYPE,
        item: { ...item, index },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    //prevent default drag preview
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
      }, [preview])

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className="flex items-center cursor-move rounded-md shadow-md bg-white p-2 my-2 toaster"
            style={{ opacity: isDragging ? 0 : 1 }}
            data-handler-id={handlerId}
        >   
            <span className='mr-2 cursor-pointer' onClick={()=>deleteSingleTask(index, item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </span>
            <p className='cursor-move text-base'>{item.title}</p>
        </div>
    );
});

export default Task;