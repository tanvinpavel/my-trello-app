import { useDrop } from "react-dnd";
import ITEM_TYPE from "../../../data/types";

const DropWrapper = ({ children, onDropFunc, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ITEM_TYPE,
        drop: (item, monitor) => {
            onDropFunc(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    const className = isOver ? "highlight-region" : "";

    return (
        <div ref={drop} className={`h-full ${className}`}>
            {children}
        </div>
    )
};

export default DropWrapper;