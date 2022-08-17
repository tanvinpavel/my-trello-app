import React, { memo, useEffect, useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from 'react-dnd-html5-backend';
import ITEM_TYPE from '../../../data/types';

const Task = memo(({item, index, moveItemFunc}) => {
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

            console.log(dragIndex, hoverIndex);

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
            className="flex items-center cursor-move rounded-md shadow-md bg-white p-2 my-2"
            style={{ opacity: isDragging ? 0 : 1 }}
            data-handler-id={handlerId}
        >
            <p className='text-base'>{item.title}</p>
        </div>
    );
});

export default Task;